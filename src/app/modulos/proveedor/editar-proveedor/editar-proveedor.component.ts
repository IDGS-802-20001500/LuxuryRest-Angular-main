import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Producto } from 'src/app/interfaces/producto';
import { Proveedor } from 'src/app/interfaces/proveedor';

@Component({
  selector: 'app-editar-proveedor',
  templateUrl: './editar-proveedor.component.html',
  styleUrls: ['./editar-proveedor.component.css'],
})
export class EditarProveedorComponent {
  id_proveedor: number = 0;
  nombre_empresa: string = '';
  nombre_contacto: string = '';
  correo_electronico: string = '';
  telefono: string = '';
  direccion: string = '';
  Activo: boolean = true;

  listaProveedores: Array<any> = [{}];

  constructor(
    private route: ActivatedRoute,
    private conexiones: ConexionServiceService,
    private router: Router,
    private dialog: MatDialog
  ) {
    let parametros_recibidos: any = this.route.snapshot.params;
    this.id_proveedor = parametros_recibidos.id_proveedor;
    this.consultarProv();
  }

  consultarProv() {
    this.conexiones.getProveedores().subscribe({
      next: (response) => {
        this.listaProveedores = response;
        this.cargarDatos();
      },
      error: (error) => console.log(error),
    });
  }

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

  guardarProveedor() {
    const datos = this.construirDatosProducto();

    this.conexiones.editarProveedor(this.id_proveedor, datos).subscribe(
      (response) => {
        alert('Se actualizo');
        this.mostrarDialog(
          'Éxito',
          'Hubo un error al intentar de editar proveedor.');
        this.router.navigate(['proveedores']);
      },
      (error) => {
        alert('no se actualizo');
        this.mostrarDialog(
          'Error',
          'Proveedor editado exitosamente.');
          
        this.router.navigate(['proveedores']);
      }
    );
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


  cargarDatos() {
    const proveedorEncontrado = this.listaProveedores.find(
      (proveedor) => proveedor.id_proveedor == this.id_proveedor
    );

    this.nombre_empresa = proveedorEncontrado.nombre_empresa;
    this.nombre_contacto = proveedorEncontrado.nombre_contacto;
    this.correo_electronico = proveedorEncontrado.correo_electronico;
    this.telefono = proveedorEncontrado.telefono;
    this.direccion = proveedorEncontrado.direccion;
  }
}
