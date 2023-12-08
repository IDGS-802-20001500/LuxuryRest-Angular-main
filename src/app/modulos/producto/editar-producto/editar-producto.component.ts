import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Producto } from 'src/app/interfaces/producto';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
})
export class EditarProductoComponent {
  id_producto: number = 0;

  listaProductos: Array<any> = [{}];

  nombre: string = '';
  descripcion: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  constructor(
    private route: ActivatedRoute,
    private conexiones: ConexionServiceService,
    private router: Router,
    private dialog: MatDialog, // Inyecta MatDialog
  ) {
    let parametros_recibidos: any = this.route.snapshot.params;
    this.id_producto = parametros_recibidos.id_producto;

    this.consultarPorId(parametros_recibidos.id_producto);

  }

  consultarPorId(id:number) {
    this.conexiones.getProductos().subscribe({
      next: (response) => {
        this.listaProductos = response;

        this.cargarDatosDeConsulta(id);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatosDeConsulta(id:number) {
    const productoEncontrado = this.listaProductos.find(
      (producto) => producto.id_producto == id
    );

    this.nombre = productoEncontrado.nombre;
    this.descripcion = productoEncontrado.descripcion;
    this.imagen = productoEncontrado.imagen;
    this.precio_venta = productoEncontrado.precio_venta;
    this.cantidad_disponible = productoEncontrado.cantidad_disponible;
    this.valoracionT = productoEncontrado.valoracionT;
    this.valoracionC = productoEncontrado.valoracionC;
    this.estatus = productoEncontrado.estatus;
  }

  cargarImagen(input: HTMLInputElement): void {
    const archivo = input.files?.[0];

    if (archivo) {
      const lector = new FileReader();
      lector.onload = (e) => {
        this.imagen = e.target?.result as string; // Afirmamos que es string
      };
      lector.readAsDataURL(archivo);
    } else {
      this.imagen = ''; // Limpiar la imagen si no se selecciona un archivo
    }
  }

  editar() {
    const datos = this.construirDatosProducto();
    this.conexiones.editarProducto(this.id_producto, datos).subscribe({
      next: (response) => {
        console.log('Producto editado con éxito', response);
        this.mostrarDialog('Éxito', 'El producto se ha editado correctamente.');
        this.router.navigate(['producto']);
      },
      error: (error) => {
        console.error('Error al editar el producto', error);
        this.mostrarDialog('Error', 'Ha ocurrido un error al editar el producto.');
        this.router.navigate(['producto']);
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



  construirDatosProducto(): any {
    const datos: Producto = {
      id_producto: this.id_producto,
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
