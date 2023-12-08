import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { Router } from '@angular/router'; // Importa Router
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css'],
})
export class CrearProductoComponent {

   opcionSeleccionada: number=0;
   listaProductosSeleccionado: any;
  productosConEstatus1: Array<any> = [{}];


  listaProductos: Array<any> = [{}];
  id_producto: number = 0;
  cantidad_Fabricar: number = 0;
  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  constructor(public conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router,
    
    ) {
    this.consultar();
  }

  consultar() {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;
        this.productosConEstatus1 = this.listaProductos.filter(producto => producto.estatus === 1);
      },
      error: (error) => console.log(error),
    });
  }
  

  cargarDatos(id_producto: number) {
    // Encuentra el producto en la lista por su ID
const productoEncontrado = this.listaProductos.find(producto => producto.id_producto == this.opcionSeleccionada);

  // Guarda los campos del producto en variables
  this.nombre = productoEncontrado.nombre;
  this.descripcion = productoEncontrado.descripcion;
  this.imagen =productoEncontrado.imagen;
  this.precio_venta = productoEncontrado.precio_venta;
  this.cantidad_disponible = productoEncontrado.cantidad_disponible;
  this.valoracionT = productoEncontrado.valoracionT;
  this.valoracionC = productoEncontrado.valoracionC;
  this.estatus = productoEncontrado.estatus;
  this.cantidad_disponible=productoEncontrado.cantidad_disponible

  console.log("Producto encontrado:", this.nombre);

  }
  

  
  crearProd() {
    const datos = this.construirDatosProducto();
    console.log(datos)
    this.conexiones.editarProducto(this.opcionSeleccionada,datos).subscribe(
      response => {
        console.log('Producto creado con éxito', response);
        this.mostrarDialog('Éxito', 'El producto se ha agregado correctamente.');
        this.router.navigate(['producto']); 
      },
      error => {
        console.error('Error al crear el producto', error);
        this.mostrarDialog('Error', 'Ha ocurrido un error al agregar el producto.');
        this.router.navigate(['producto']); 
      },
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

    construirDatosProducto(): any {
      const datos: Producto = {
        id_producto: this.opcionSeleccionada,
        nombre:  this.nombre,
        descripcion:  this.descripcion,
        imagen: this.imagen,
        precio_venta: this.precio_venta,
        cantidad_disponible:  this.cantidad_disponible+this.cantidad_Fabricar,
        valoracionT:  this.valoracionT,
        valoracionC:  this.valoracionC,
        estatus:  this.estatus,
      };
      return datos;
    }

    
usuario = "" + localStorage.getItem('usuario');
}
