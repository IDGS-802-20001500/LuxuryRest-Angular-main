import { Component, Inject } from '@angular/core';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { FormsModule } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router'; // Importa Router
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
})
export class AgregarProductoComponent {
  nombre: string = '';
  descripcion: string = '';
  imagenMostrada: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;

  construirDatosProducto(): any {
    const datos: Producto = {
      id_producto: 0,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagenMostrada,
      precio_venta: this.precio_venta,
      cantidad_disponible: this.cantidad_disponible,
      valoracionT: 0,
      valoracionC: 0,
      estatus: 1,
    };
    return datos;
  }

  constructor(private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
    ) {}

  cargarImagen(input: HTMLInputElement): void {
    const archivo = input.files?.[0];

    if (archivo) {
      const lector = new FileReader();
      lector.onload = (e) => {
        this.imagenMostrada = e.target?.result as string; // Afirmamos que es string
      };
      lector.readAsDataURL(archivo);
    } else {
      this.imagenMostrada = ''; // Limpiar la imagen si no se selecciona un archivo
    }
  }

  
usuario = "" + localStorage.getItem('usuario');
  agregarProd() {
    const datos = this.construirDatosProducto();
    this.conexiones.agregarProductos(datos).subscribe({
      next: (response) => {
        console.log('Producto agregado con éxito', response);
        this.mostrarDialog('Éxito', 'El producto se ha agregado correctamente.');
        this.router.navigate(['producto']); 
      },
      error: (error) => {
        console.error('Error al agregar el producto', error);
        this.mostrarDialog('Error', 'Ha ocurrido un error al agregar el producto.');
        this.router.navigate(['producto']); 
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

  }