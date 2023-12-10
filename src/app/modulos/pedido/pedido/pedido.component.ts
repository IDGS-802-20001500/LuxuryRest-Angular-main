import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Pedidos } from 'src/app/interfaces/pedidos';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css'],
})
export class PedidoComponent {
  listaVentas: Array<any> = [{}];
  listaPedidos: Array<any> = [{}];
  listaPedidosProducto: Array<any> = [{}];
  listaProductos: Array<any> = [{}];
  id_usuario: number = 0;

  currentDate = new Date();
  rol: string = '';

  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    this.id_usuario = Number(localStorage.getItem('id_usuario'));

    this.rol = '' + localStorage.getItem('rol');
    this.consultarVentas();
  }

  consultarVentas() {
    this.conexiones.getVentas().subscribe({
      next: (response) => {
        this.listaVentas = response;
        this.consultarPedidos();
      },
      error: (error) => console.log(error),
    });
  }
  consultarPedidos() {
    this.conexiones.getPedidos().subscribe({
      next: (response) => {
        this.listaPedidos = response;
        this.consultarPedidosProducto();
      },
      error: (error) => console.log(error),
    });
  }
  consultarPedidosProducto() {
    this.conexiones.getPedidosProductos().subscribe({
      next: (response) => {
        this.listaPedidosProducto = response;
        this.consultarProducto();
      },
      error: (error) => console.log(error),
    });
  }
  consultarProducto() {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;
      },
      error: (error) => console.log(error),
    });
  }

  id_pedido: number = 0;
  estado_pedido: number = 0;
  fecha_hora_pedido: Date = new Date();
  domicilio: string = '';
  empleado: number = 1;
  fecha_hora_entrega: Date = new Date();

  usuario = '' + localStorage.getItem('usuario');

  agregarPedido() {
    const datos = this.construirPedido();
    this.conexiones.editarPedido(this.id_pedido, datos).subscribe(
      (response) => {
        console.log('pedido actualizado con éxito', response);

        this.consultarVentas();

        this.mostrarDialog('Éxito', 'Pedido actualizado exitosamente .');
        this.router.navigate(['pedidos']);
      },
      (error) => {
        console.error('pedido al agregar la venta', error);
        this.mostrarDialog(
          'Error',
          'Ha ocurrido un error al actualizar pedido .'
        );
        this.router.navigate(['pedidos']);
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

  construirPedido(): any {
    const formattedDate = this.currentDate.toISOString().slice(0, 10);
    const datos: Pedidos = {
      id_pedido: this.id_pedido,
      id_usuario: this.id_usuario,
      estado_pedido: this.estado_pedido,
      fecha_hora_pedido: '' + this.fecha_hora_pedido,
      domicilio: '',
      empleado: 1,
      fecha_hora_entrega: formattedDate,
    };
    return datos;
  }

  enviar(id: number) {
    const productoEncontrado = this.listaPedidos.find(
      (producto) => producto.id_pedido == id
    );

    this.id_pedido = productoEncontrado.id_pedido;
    this.estado_pedido = 3;
    this.id_usuario = productoEncontrado.id_usuario;
    this.fecha_hora_pedido = productoEncontrado.fecha_hora_pedido;
    this.empleado = 1;

    this.agregarPedido();
  }

  eliminar(id: number) {
    const productoEncontrado = this.listaPedidos.find(
      (producto) => producto.id_pedido == id
    );

    this.id_pedido = productoEncontrado.id_pedido;
    this.estado_pedido = 4;
    this.fecha_hora_pedido = productoEncontrado.fecha_hora_pedido;
    this.domicilio = '';
    this.empleado = 1;

    //Funcion que sirvira para regresar los productos la cantidad al inventario
    const productoEncontrado2 = this.listaPedidosProducto.filter(
      (producto) => producto.id_pedido == id
    );

    productoEncontrado2.forEach((productoEncontrado2) => {
      const buscarProducto = this.listaProductos.find(
        (producto) => producto.id_producto == productoEncontrado2.id_producto
      );

      if (buscarProducto) {
        buscarProducto.cantidad_disponible += productoEncontrado2.cantidad;

        console.log(buscarProducto.id_producto);
        console.log(buscarProducto.cantidad_disponible);
        console.log(productoEncontrado2.cantidad);

        this.conexiones
          .editarProducto(buscarProducto.id_producto, buscarProducto)
          .subscribe(
            (response) => {
              console.log('producto actualizado con éxito', response);
            },
            (error) => {
              console.error('producto al agregar la venta', error);
            }
          );
      }
    });

    this.agregarPedido();
  }
}
