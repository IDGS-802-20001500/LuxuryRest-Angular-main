import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Receta } from 'src/app/interfaces/receta';

@Component({
  selector: 'app-editar-receta',
  templateUrl: './editar-receta.component.html',
  styleUrls: ['./editar-receta.component.css'],
})
export class EditarRecetaComponent {
  id_receta: number = 0;
  id_materia_prima: number = 0;
  id_producto: number = 0;
  cantidad_requerida: number = 0;
  Activo: number = 1;
  usuario = '' + localStorage.getItem('usuario');

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
  unidad_medida: string = '';
  cantidad_minima_requerida: number = 0;
  precio_compra: number = 0.0;
  id_proveedor: number = 0;

  nombre1: string = '';
  descripcion: string = '';
  imagenMostrada: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  listaRecetas: Array<any> = [{}];
  ordenAscendente = true;
  filtro: string = '';
  listaCompletaReceta: Array<any> = [{}];

  constructor(
    public conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router, // Inyecta Router
    private route: ActivatedRoute
  ) {
    this.consultarMaterias();

    let parametros_recibidos: any = this.route.snapshot.params;
    this.id_receta = parametros_recibidos.id_receta;

    this.consultarPorId(parametros_recibidos.id_receta);
  }

  consultarPorId(id: number) {
    this.conexiones.getReceta().subscribe({
      next: (response) => {
        this.listaRecetas = response;

        this.cargarDatosDeConsulta(id);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatosDeConsulta(id: number) {
    const recetaEncontrada = this.listaRecetas.find(
      (receta) => receta.id_receta == id
    );

    this.id_materia_prima = recetaEncontrada.id_materia_prima;
    this.id_producto = recetaEncontrada.id_producto;
    this.cantidad_requerida = recetaEncontrada.cantidad_requerida;

    // Establece las opciones seleccionadas para los selects
    this.opcionSeleccionada = this.id_materia_prima;
    this.opcionSeleccionada1 = this.id_producto;

    console.log(this.id_receta);
    console.log(this.id_producto);
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
    // Encuentra el producto en la lista por su ID
    const productoEncontrado = this.listaIdNombreproductos.find(
      (producto) => producto.id_producto == this.opcionSeleccionada1
    );
    console.log('opcion de producto');
    console.log(this.opcionSeleccionada1);
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
    // Encuentra el producto en la lista por su ID
    const materiaEncontrado = this.listaIdNombreMaterias.find(
      (materiaP) => materiaP.id_materia_prima == this.opcionSeleccionada
    );
    console.log('opcion de materia');
    console.log(this.opcionSeleccionada);
    console.log('3 cosa' + materiaEncontrado);
    // Guarda los campos del producto en variables
    this.id_materia_prima = materiaEncontrado.id_materia_prima;
    this.id_proveedor = materiaEncontrado.id_proveedor;
    this.nombre = materiaEncontrado.nombre;
    this.unidad_medida = materiaEncontrado.unidad_medida;
    this.cantidad_minima_requerida =
      materiaEncontrado.cantidad_minima_requerida;
    this.precio_compra = materiaEncontrado.precio_compra;
    this.Activo = materiaEncontrado.Activo;

    console.log('materiaP encontrada:', this.nombre);
    console.log('materiaP encontrada:', this.id_materia_prima);
  }

  editar() {
    const datos = this.construirDatosReceta();
    this.conexiones.editarReceta(this.id_receta, datos).subscribe({
      next: (response) => {
        console.log('Receta editado con éxito', response);
        this.mostrarDialog('Éxito', 'Receta eliminada exitosamente.');
        this.router.navigate(['receta']);

        // Redireccionar a la lista de productos u otras acciones necesarias
      },
      error: (error) => {
        console.error('Error al editar la receta', error);
        this.mostrarDialog('Éxito', 'Receta eliminada exitosamente.');
        this.router.navigate(['receta']);
      },
    });
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
      id_receta: this.id_receta,
      id_materia_prima: this.id_materia_prima,
      id_producto: this.id_producto,
      cantidad_requerida: this.cantidad_requerida,
    };
    console.log(datos);
    return datos;
  }
}
