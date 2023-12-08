import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Producto } from 'src/app/interfaces/producto';
import { Proveedor } from 'src/app/interfaces/proveedor';

@Component({
  selector: 'app-agregar-proveedor',
  templateUrl: './agregar-proveedor.component.html',
  styleUrls: ['./agregar-proveedor.component.css'],
})
export class AgregarProveedorComponent {
  id_proveedor: number = 0;
  nombre_empresa: string = '';
  nombre_contacto: string = '';
  correo_electronico: string = '';
  telefono: string = '';
  direccion: string = '';
  Activo: boolean = true;

  constructor(
 
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router

  ) {}

  guardarProveedor() {
    const datos = this.construirDatosProducto();

    this.conexiones.agregarProveedores(datos).subscribe(
      (response) => {

        this.mostrarDialog(
          'Éxito',
          'Proveedor registrado exitosamente.'
        );
        this.router.navigate(['proveedores']);
      },
      (error) => {
        this.mostrarDialog(
        'Error',
        'Hubo un error al intentar de registrar proveedor.'
      );
      
      this.router.navigate(['proveedores']);
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


  

usuario = "" + localStorage.getItem('usuario');

  construirDatosProducto(): any {
    const datos: Proveedor = {
      id_proveedor: this.id_proveedor,
      nombre_empresa: this.nombre_empresa,
      nombre_contacto: this.nombre_contacto,
      correo_electronico: this.correo_electronico,
      telefono: this.telefono,
      direccion: this.direccion,
      Activo: this.Activo,
    };
    return datos;
  }
}
