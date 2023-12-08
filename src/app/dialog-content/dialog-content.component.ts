import { Component, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { ConexionServiceService } from '../conexion-service.service';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.css'],
})
export class DialogContentComponent {
  listaProductos: Array<any> = [{}];
  listaCompletaProducto: Array<any> = [{}];
  id_producto: number = 0;
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  cantidad_comprar: number = 1;

  constructor(
    public conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private dialogRef: MatDialogRef<DialogContentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.id_producto = data.id_producto;
    this.consultar();
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

  consultar() {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;
        this.listaCompletaProducto = this.listaProductos;

        this.filtrarLista();
      },
      error: (error) => console.log(error),
    });
  }

  listaProductoSeleccionado: Array<any> = [{}];

  agregarAlCarritoMasProducto() {
    // Crear un nuevo objeto con la propiedad cantidadComprar
    const productoConCantidad = {
      ...this.listaProductoSeleccionado, // Copiar las propiedades existentes
      cantidadComprar: this.cantidad_comprar,
    };
    if (this.cantidad_comprar > this.cantidad_disponible) {
      this.mostrarDialog(
        'Error',
        'No se puede vender mayor cantidad de la existente en stock.'
      );
    } else {
      // Obtener la lista del carrito del localStorage
      let lista =
        JSON.parse('' + localStorage.getItem('listaProductosCarrito')) || [];

      // Agregar el nuevo objeto a la lista del carrito
      lista.push(productoConCantidad);

      // Guardar la lista actualizada en el localStorage
      localStorage.setItem('listaProductosCarrito', JSON.stringify(lista));

      console.log(lista);
      this.mostrarDialog('Éxito', 'Se agrego el producto exitosamente.');
    }
  }

  filtrarLista() {
    const productoEncontrado = this.listaProductos.find(
      (producto) => producto.id_producto == this.id_producto
    );

    this.listaProductoSeleccionado = productoEncontrado;
    this.nombre = productoEncontrado.nombre;
    this.precio_venta = productoEncontrado.precio_venta;
    this.cantidad_disponible = productoEncontrado.cantidad_disponible;
    this.imagen = productoEncontrado.imagen;
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
