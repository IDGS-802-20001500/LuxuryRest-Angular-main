import { Component } from '@angular/core';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { Compras } from 'src/app/interfaces/compras';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Inventario } from 'src/app/interfaces/inventario';


@Component({
  selector: 'app-compra-materia',
  templateUrl: './compra-materia.component.html',
  styleUrls: ['./compra-materia.component.css'],
})
export class CompraMateriaComponent {
  nombre: string = '';
  descripcion: string = '';
  opcionSeleccionada: number = 0;
  imagenMostrada: string = '';

  id_usuario = Number(localStorage.getItem('id_usuario'));
  id_materia_prima: number = 0;
  cantidad_comprada: number = 0;
  fecha_compra: Date = new Date();
  listaMateriaPrima: Array<any> = [{}];
  listaCompletaMateriasPrimas: Array<any> = [{}];
  listaNombreIdMateriaPrima: Array<any> = [{}];
  id_proveedor: any;
  unidad_medida: any;
  cantidad_minima_requerida: any;
  Activo: any;
  precio_compra: any;
    listaInventario:Array<any>=[{}];
    cantidad_almacenada:number=0;
  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    this.consultarMateriasPrimas();
  }

  consultarMateriasPrimas() {
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMateriaPrima = response;
        console.log(this.listaMateriaPrima);
        this.listaCompletaMateriasPrimas = this.listaMateriaPrima;
        this.listaNombreIdMateriaPrima = this.listaMateriaPrima;
        console.log('1 cosa');
        console.log(this.listaNombreIdMateriaPrima);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatos(id_materia_prima: number) {
    // Encuentra la materia prima seleccionada en la lista por su ID
    const materiaEncontrada = this.listaNombreIdMateriaPrima.find(
      (materia) => materia.id_materia_prima == this.opcionSeleccionada
    );
  


    console.log('2 cosa' + materiaEncontrada);
    // Guarda los campos del producto en variables
    this.id_materia_prima = materiaEncontrada.id_materia_prima;
    this.id_proveedor = materiaEncontrada.id_proveedor;
    this.nombre = materiaEncontrada.nombre;
    this.unidad_medida = materiaEncontrada.unidad_medida;
    this.cantidad_minima_requerida =
      materiaEncontrada.cantidad_minima_requerida;
    this.precio_compra = materiaEncontrada.precio_compra;
    this.Activo = materiaEncontrada.Activo;


    // Actualiza los campos de entrada en el formulario
    const precioInput = document.getElementById('precioM') as HTMLInputElement;
    const cantidadMinInput = document.getElementById(      'cantidadMin'   ) as HTMLInputElement;
    
    if (precioInput && cantidadMinInput ) {
      precioInput.value = this.precio_compra;
      cantidadMinInput.value = this.cantidad_minima_requerida;
    }

    console.log('Materia encontrada:', this.nombre);
    console.log('Materia encontrada:', this.id_materia_prima);
  }

  calcularTotal(): number {
    return this.cantidad_comprada * this.precio_compra;
  }

  agregarCompra() {
    const datos = this.construirDatosCompra();
    this.conexiones.agregarCompras(datos).subscribe({
      next: (response) => {
        console.log('Producto agregado con éxito', response);
        this.mostrarDialog('Éxito', 'La compra se ha agregado correctamente.');
        this.router.navigate(['compras']);
      },
      error: (error) => {
        console.error('Error al agregar la compra', error);
        this.mostrarDialog(
          'Error',
          'Ha ocurrido un error al agregar la compra, es probable que haya suficiente cantidad almacenada de la materia prima para realizar la compra.'
        );
        this.router.navigate(['compras']);
      },
    });
  }



  usuario = "" + localStorage.getItem('usuario');
  // Función para mostrar el diálogo
  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
    });
  }

  construirDatosCompra(): any {
    const datos: Compras = {
      id_compra: 0,
      id_usuario: Number(this.id_usuario),
      id_materia_prima: Number (this.id_materia_prima),
      cantidad_comprada: Number(this.cantidad_comprada),
      fecha_compra: this.fecha_compra,
    };
    console.log(datos);
    return datos;
  }
}
