import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogContentComponent } from 'src/app/dialog-content/dialog-content.component';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.component.html',
  styleUrls: ['./venta.component.css'],
})
export class VentaComponent {
  activarFiltro: boolean = true;
  listaProductos: Array<any> = [];
  ordenAscendente = true;
  filtro: string = '';
  listaCompletaProducto: Array<any> = [];
  totalRegistros: number = 0;

  usuario = '' + localStorage.getItem('usuario');

  constructor(
    public conexiones: ConexionServiceService,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.consultar();

    let lista =
      JSON.parse('' + localStorage.getItem('listaProductosCarrito')) || [];
    this.totalRegistros = lista.length;
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      data: {
        id_producto: id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('Diálogo cerrado con resultado:', result);
        this.conexiones.triggerRefresh();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/ventas']);
          });
      } else {
        console.log('Diálogo cerrado sin resultado');
        this.conexiones.triggerRefresh();
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() => {
            this.router.navigate(['/ventas']);
          });
      }
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

  consultar() {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;
        this.listaCompletaProducto = this.listaProductos;
      },
      error: (error) => console.log(error),
    });
  }

  filtrarLista() {
    const filtroLimpio = this.filtro.trim();
    this.listaProductos = this.listaCompletaProducto.filter(
      (item) =>
        item.nombre.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
        item.descripcion.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
        item.precio_venta
          .toString()
          .toLowerCase()
          .includes(filtroLimpio.toLowerCase())
    );
  }

  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  puntuar(numer: number, id: number) {
    const productoEncontrado = this.listaProductos.find(
      (producto) => producto.id_producto == id
    );

    this.nombre = productoEncontrado.nombre;
    this.descripcion = productoEncontrado.descripcion;
    this.imagen = productoEncontrado.imagen;
    this.precio_venta = productoEncontrado.precio_venta;
    this.cantidad_disponible = productoEncontrado.cantidad_disponible;
    this.valoracionT = numer;
    this.valoracionC = productoEncontrado.valoracionC;
    this.estatus = productoEncontrado.estatus;

    this.editar(id);
  }

  editar(id: number) {
    const datos = this.construirDatosProducto(id);
    this.conexiones.editarProducto(id, datos).subscribe({
      next: (response) => {
        console.log('Producto editado con éxito', response);
        this.consultar();
      },
      error: (error) => {
        console.error('Error al editar el producto', error);
      },
    });
  }

  construirDatosProducto(id: number): any {
    const datos: Producto = {
      id_producto: id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
      precio_venta: this.precio_venta,
      cantidad_disponible: this.cantidad_disponible,
      valoracionT: this.valoracionT,
      valoracionC: this.valoracionC,
      estatus: this.estatus,
    };
    return datos;
  }
}
