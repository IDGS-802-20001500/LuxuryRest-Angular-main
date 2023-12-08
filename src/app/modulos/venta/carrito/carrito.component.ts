import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css'],
})
export class CarritoComponent {
  total: number = 0;
  listaCarrito: Array<any> = [{}];

  usuario = '' + localStorage.getItem('usuario');

  constructor(private router: Router) {
    this.mostrar();
    this.calcularTotal();
  }

  mostrar() {
    this.listaCarrito =
      JSON.parse('' + localStorage.getItem('listaProductosCarrito')) || [];
  }

  calcularTotal() {
    this.total = this.listaCarrito.reduce((accumulator, carrito) => {
      return accumulator + carrito.precio_venta * carrito.cantidadComprar;
    }, 0);
  }

  guardarEnLocalStorage() {
    localStorage.setItem(
      'listaProductosCarrito',
      JSON.stringify(this.listaCarrito)
    );
  }

  eliminarProducto(index: number) {
    this.listaCarrito.splice(index, 1); // Eliminar el elemento en la posición 'index'
    this.guardarEnLocalStorage();
    this.calcularTotal(); // Recalcular el total después de eliminar
    this.mostrar(); // Actualizar la lista en la plantilla
  }

  moduloPago() {
    this.router.navigate(['/ventas/carrito/pago']);
  }
}
