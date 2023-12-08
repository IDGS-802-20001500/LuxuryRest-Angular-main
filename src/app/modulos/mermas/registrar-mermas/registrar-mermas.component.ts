import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Merma } from 'src/app/interfaces/merma';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-registrar-mermas',
  templateUrl: './registrar-mermas.component.html',
  styleUrls: ['./registrar-mermas.component.css'],
})
export class RegistrarMermasComponent {
  listaProductos: Array<any> = [{}];
  listaProductoSel: Array<any> = [{}];
  listaCompletaProductos: Array<any> = [{}];
  listaMermas: Array<any> = [{}];
  listaCompletaMermas: Array<any> = [{}];
  cantidadMerma: number = 0;
  descripcion: string = '';

  id_productoSel: number = 0;

  currentDate = new Date();

  nombre: string = '';
  descripcionProducto: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    this.consultar();
  }

  consultar() {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;
        this.listaCompletaProductos = this.listaProductos;
      },
      error: (error) => console.log(error),
    });
  }

  onProductoSeleccionado(event: any) {
    this.id_productoSel = event.target.value;
    this.cargarDatosDeConsulta(this.id_productoSel);
  }

  agregarMerma() {
    const datos = this.construirDatosMerma();
    this.conexiones.agregarMerma(datos).subscribe(
      (response) => {
        console.log('merma agregado con éxito', response);

        this.mostrarDialog('Éxito', 'Merma se ha registrado exitosamente.');
        this.router.navigate(['mermas']);
      },
      (error) => {
        console.error('Error al agregar el merma', error);
        this.mostrarDialog(
          'Error',
          'Ha ocurrido un error al agregar la merma.'
        );
        this.router.navigate(['mermas']);
      }
    );
    this.editar();
  }

  construirDatosMerma(): any {
    const formattedDate = this.currentDate.toISOString().slice(0, 10);
    const datos: Merma = {
      id_perecedero: 0,
      id_producto: this.id_productoSel,
      descripcion: this.descripcion,
      cantidad_perdida: this.cantidadMerma,
      fecha_registro: formattedDate,
    };
    return datos;
  }

  //_________________________________-productos_________________
  usuario = "" + localStorage.getItem('usuario');
  editar() {
    const datos = this.construirDatosProducto();
    this.conexiones.editarProducto(this.id_productoSel, datos).subscribe({
      next: (response) => {
        console.log('Producto editado con éxito', response);

        this.mostrarDialog('Éxito', 'Merma se ha registrado exitosamente.');
        this.router.navigate(['mermas']);

        // Redireccionar a la lista de productos u otras acciones necesarias
      },
      error: (error) => {
        console.error('Error al editar el producto', error);
        this.mostrarDialog(
          'Error',
          'Ha ocurrido un error al agregar la merma.'
        );
        this.router.navigate(['mermas']);
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

  cargarDatosDeConsulta(id: number) {
    const productoEncontrado = this.listaProductos.find(
      (producto) => producto.id_producto == id
    );

    this.nombre = productoEncontrado.nombre;
    this.descripcionProducto = productoEncontrado.descripcion;
    this.imagen = productoEncontrado.imagen;
    this.precio_venta = productoEncontrado.precio_venta;
    this.cantidad_disponible = productoEncontrado.cantidad_disponible;
    this.valoracionT = productoEncontrado.valoracionT;
    this.valoracionC = productoEncontrado.valoracionC;
    this.estatus = productoEncontrado.estatus;
  }

  construirDatosProducto(): any {
    const datos: Producto = {
      id_producto: this.id_productoSel,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
      precio_venta: this.precio_venta,
      cantidad_disponible: this.cantidad_disponible - this.cantidadMerma,
      valoracionT: this.valoracionT,
      valoracionC: this.valoracionC,
      estatus: this.estatus,
    };
    return datos;
  }
}
