import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Pedidos } from 'src/app/interfaces/pedidos';
import { PedidosProductos } from 'src/app/interfaces/pedidos-productos';
import { Producto } from 'src/app/interfaces/producto';
import { Venta } from 'src/app/interfaces/venta';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css'],
})
export class PagoComponent {
  usuario = '' + localStorage.getItem('usuario');

  nombre: string = '';
  fecha: Date = new Date();
  total: number = 0;
  currentDate = new Date();

  listaCarrito: Array<any> = [{}];
  listaPedidos: Array<any> = [{}];
  listaProductos: Array<any> = [{}];

  id_pedido: number = 0;

  id_usuario: number = 0;

  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    this.id_usuario = Number(localStorage.getItem('id_usuario'));
    this.mostrar();
  }

  mostrar() {
    this.listaCarrito =
      JSON.parse('' + localStorage.getItem('listaProductosCarrito')) || [];
    this.nombre = localStorage.getItem('usuario') + '';
    this.calcularTotal();

    console.log(this.listaCarrito);
  }

  calcularTotal() {
    this.total = this.listaCarrito.reduce((accumulator, carrito) => {
      return accumulator + carrito.precio_venta * carrito.cantidadComprar;
    }, 0);
  }

  pagar() {
    this.agregarVentas();
  }

  pagado() {
    // Itera sobre cada producto en la listaCarrito
    this.listaCarrito.forEach((producto) => {
      // Construye los datos para el pedido de producto
      const datos = this.construirPedidoProducto(producto);

      this.editarProductos(
        producto.id_producto,
        producto.nombre,
        producto.descripcion,
        producto.imagen,
        producto.precio_venta,
        producto.cantidad_disponible - producto.cantidadComprar,
        producto.valoracionC,
        producto.valoracionT,
        producto.estatus
      );
      // Llama al método agregarPedidoProducto para agregar el pedido del producto
      this.conexiones.agregarPedidosProductos(datos).subscribe(
        (response) => {
          console.log('pedido producto agregado con éxito', response);

          this.mostrarDialog('Éxito', 'Venta realizada exitosamente.');

          // Limpiar la lista del carrito en localStorage después de realizar el pago
          localStorage.removeItem('listaProductosCarrito');
          this.router.navigate(['ventas']);
        },
        (error) => {
          console.error('pedido producto al agregar la venta', error);

          // Limpiar la lista del carrito en localStorage después de realizar el pago
          localStorage.removeItem('listaProductosCarrito');

          this.mostrarDialog(
            'Error',
            'Hubo un error al intentar de realizar la venta.'
          );
          this.router.navigate(['ventas']);
        }
      );
    });
  }

  construirPedidoProducto(producto: any): any {
    const datos: PedidosProductos = {
      id_pedido: this.id_pedido,
      id_producto: producto.id_producto,
      cantidad: producto.cantidadComprar,
    };
    return datos;
  }

  editarProductos(
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    precio_venta: number,
    cantidad_disponible: number,
    valoracionC: number,
    valoracionT: number,
    estatus: number
  ) {
    const datos = this.construirDatosProducto(
      id,
      nombre,
      descripcion,
      imagen,
      precio_venta,
      cantidad_disponible,
      valoracionC,
      valoracionT,
      estatus
    );
    this.conexiones.editarProducto(id, datos).subscribe({
      next: (response) => {
        console.log('Producto editado con éxito', response);
        // this.router.navigate(['pedidos']);
      },
      error: (error) => {
        console.error('Error al editar el producto', error);
      },
    });
  }

  construirDatosProducto(
    id: number,
    nombre: string,
    descripcion: string,
    imagen: string,
    precio_venta: number,
    cantidad_disponible: number,
    valoracionC: number,
    valoracionT: number,
    estatus: number
  ): any {
    const datos: Producto = {
      id_producto: id,
      nombre: nombre,
      descripcion: descripcion,
      imagen: imagen,
      precio_venta: precio_venta,
      cantidad_disponible: cantidad_disponible,
      valoracionT: valoracionT,
      valoracionC: valoracionC,
      estatus: estatus,
    };
    return datos;
  }

  ///____________________________________________________________________________________________________________
  agregarVentas() {
    const datos = this.construirVentas();
    this.conexiones.agregarVenta(datos).subscribe(
      (response) => {
        console.log('venta agregado con éxito', response);

        //this.router.navigate(['ventas']);

        this.agregarPedido();
      },
      (error) => {
        console.error('Error al agregar la venta', error);
        this.mostrarDialog(
          'Error',
          'Hubo un error al intentar de registrar usuarios.'
        );
        //  this.router.navigate(['ventas']);
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

  construirVentas(): any {
    const formattedDate = this.currentDate.toISOString().slice(0, 10);
    const datos: Venta = {
      id_venta: 0,
      id_usuario: this.id_usuario,
      precio_total: this.total,
      fecha_hora_venta: formattedDate,
    };
    return datos;
  }
  //________________________________________________________________________________________________________

  agregarPedido() {
    const datos = this.construirPedido();
    this.conexiones.agregarPedido(datos).subscribe(
      (response) => {
        console.log('pedido agregado con éxito', response);

        this.consultarPedidos();
      },
      (error) => {
        console.error('pedido al agregar la venta', error);
      }
    );
  }

  construirPedido(): any {
    const formattedDate = this.currentDate.toISOString().slice(0, 10);
    const datos: Pedidos = {
      id_pedido: 0,
      id_usuario: this.id_usuario,
      estado_pedido: 2,
      fecha_hora_pedido: formattedDate,
      domicilio: '',
      empleado: 1,
      fecha_hora_entrega: formattedDate,
    };
    return datos;
  }

  //_______________________________________________________________________________________________

  consultarPedidos() {
    this.conexiones.getPedidos().subscribe({
      next: (response) => {
        this.listaPedidos = response;
        console.log('Lista de pedidos:', this.listaPedidos);
        const ultimoPedido = this.listaPedidos[this.listaPedidos.length - 1];
        const ultimoId = ultimoPedido.id_pedido;
        this.id_pedido = ultimoId;
        console.log('Último ID de pedidos:', ultimoId);
        console.log('Lista de pedidos:', this.listaPedidos);
        this.pagado();
      },
      error: (error) => console.log(error),
    });
  }
}
