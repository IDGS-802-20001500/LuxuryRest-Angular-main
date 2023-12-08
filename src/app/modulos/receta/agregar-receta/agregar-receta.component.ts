import { Component } from '@angular/core';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { Receta } from 'src/app/interfaces/receta';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-agregar-receta',
  templateUrl: './agregar-receta.component.html',
  styleUrls: ['./agregar-receta.component.css']
})
export class AgregarRecetaComponent {

  usuario = "" + localStorage.getItem('usuario');
  id_receta: number=0;
  id_materia_prima: number = 0;
  id_producto: number = 0;
  cantidad_requerida: number=0;
  Activo: number= 1;

  listaIdNombreMaterias: Array<any> = [{}];
  listaCompletaMaterias: Array<any> = [{}];
  listaMaterias: Array<any> = [{}];
  opcionSeleccionada: number = 0;


  

  listaIdNombreproductos: Array<any> = [{}];
  listaCompletaProductos: Array<any> = [{}];
  listaProductos: Array<any> = [{}];
  opcionSeleccionada1: number = 0;

  nombre: string = '';
  cantidad_comprada: number = 0;
  unidad_medida: string='';
  cantidad_minima_requerida: number=0;
  precio_compra: number=0.0;
  id_proveedor: number=0;

  
  nombre1: string = '';
  descripcion: string = '';
  imagenMostrada: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number=0;
  valoracionC: number=0;
  estatus: number=0;


  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    this.consultarMaterias();
  }

  consultarProductos() {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;
        console.log(this.listaMaterias);
        this.listaCompletaProductos = this.listaProductos;
        this.listaIdNombreproductos = this.listaProductos;
        console.log(this.listaIdNombreproductos);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatos1(id_producto: number) {
    alert(this.opcionSeleccionada1);
    // Encuentra el producto en la lista por su ID
    const productoEncontrado = this.listaIdNombreproductos.find(
      (producto) => producto.id_producto == this.opcionSeleccionada1
    );
    console.log('2 cosa' + productoEncontrado);
    // Guarda los campos del producto en variables
    this.id_producto = productoEncontrado.id_producto;
    this.nombre1 = productoEncontrado.nombre;
    this.descripcion = productoEncontrado.descripcion;
    this.imagenMostrada = productoEncontrado.imagen;
    this.precio_venta = productoEncontrado.precio_venta;
    this.cantidad_disponible = productoEncontrado.cantidad_disponible;
    this.valoracionT = productoEncontrado.valoracionT;
    this.valoracionC = productoEncontrado.valoracionC;
    this.estatus = productoEncontrado.estatus;

    console.log('producto nombre encontrada:', this.nombre);
    console.log('producto encontrada:', this.id_producto);

    }

  consultarMaterias() {
    this.consultarProductos();
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMaterias = response;
        console.log(this.listaMaterias);
        this.listaCompletaMaterias = this.listaMaterias;
        this.listaIdNombreMaterias = this.listaMaterias;
        console.log(this.listaIdNombreMaterias);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatos(id_materia_prima: number) {
    alert(this.opcionSeleccionada);
    // Encuentra el producto en la lista por su ID
    const materiaEncontrado = this.listaIdNombreMaterias.find(
      (materiaP) => materiaP.id_materia_prima == this.opcionSeleccionada
    );
    console.log('3 cosa' + materiaEncontrado);
    // Guarda los campos del producto en variables
    this.id_materia_prima = materiaEncontrado.id_materia_prima;
    this.id_proveedor = materiaEncontrado.id_proveedor;
    this.nombre = materiaEncontrado.nombre;
    this.unidad_medida = materiaEncontrado.unidad_medida;
    this.cantidad_minima_requerida = materiaEncontrado.cantidad_minima_requerida;
    this.precio_compra = materiaEncontrado.precio_compra;
    this.Activo = materiaEncontrado.Activo;

    console.log('materiaP encontrada:', this.nombre);
    console.log('materiaP encontrada:', this.id_materia_prima);
  }

  agregarReceta() {
    const datos = this.construirDatosReceta();
    this.conexiones.crearReceta(datos).subscribe(
      (response) => {
        console.log('Receta agregada con éxito:', response);
        this.mostrarDialog(
          'Éxito',
          
          'La receta se ha agregado correctamente.'
        );
        this.router.navigate(['receta']);
        // Realizar acciones adicionales después de agregar
      },
      (error) => {
        console.error('Error al agregar receta :', error);
        this.mostrarDialog(
          'Error',
          'Ha ocurrido un error al agregar la receta.'
        );
        this.router.navigate(['receta']);
        // Manejar el error
      }
    );
  }
  

  // Función para mostrar el diálogo
  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
    });
  }

  construirDatosReceta(): any {
    const datos: Receta = {
      id_receta: 0,
      id_materia_prima: this.id_materia_prima,
      id_producto: this.id_producto,
      cantidad_requerida: this.cantidad_requerida
    };
    console.log(datos);
    return datos;
  }
}
