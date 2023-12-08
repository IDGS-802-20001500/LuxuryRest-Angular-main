import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from
  '@angular/material/dialog';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { Proveedor } from 'src/app/interfaces/proveedor';

import { Router } from '@angular/router'; // Importa el servicio Router
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent {
  activarFiltro: boolean = true;
  listaProveedores: Array<any> = [{}]
  ordenAscendente = true;
  filtro: string = '';
  listaCompletaProveedor: Array<any> = [{}]


  id_proveedor: number = 0;
  nombre_empresa: string = ""
  nombre_contacto: string = ""
  correo_electronico: string = ""
  telefono: string = ""
  direccion: string = ""
  Activo: boolean = true



  constructor(public conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
    ) {
    this.consultarProv()
  }

  consultarProv() {
    this.conexiones.getProveedores().subscribe({
      next: response => {
        this.listaProveedores = response;
        console.log(this.listaProveedores);
        this.listaCompletaProveedor = this.listaProveedores;
      },
      error: error => console.log(error)
    })
  }



  ordenarListaAlfabeticamente() {
    this.ordenAscendente = !this.ordenAscendente;

    this.listaProveedores.sort((a, b) => {
      const nombreA = a.nombre_empresa.toUpperCase();
      const nombreB = b.nombre_empresa.toUpperCase();

      if (this.ordenAscendente) {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }
    });
  }


  eliminarProveedor(
    id: number, nombre_empresa: string,
    nombre_contacto: string, correo_electronico: string,
    telefono: string, direccion: string, estatus: boolean) {

    this.id_proveedor = id;
    this.nombre_contacto = nombre_contacto
    this.nombre_empresa = nombre_empresa
    this.correo_electronico = correo_electronico
    this.telefono = telefono
    this.direccion = direccion
    this.Activo = estatus




    const datos = this.construirDatosProducto();

    this.conexiones.editarProveedor(id, datos).subscribe(
      response => {

        if (estatus) {

          alert("activado con exito")
          this.mostrarDialog(
            'Éxito',
            'Proveedor activado exitosamente.')
        }
        else {

          
        this.mostrarDialog(
          'Éxito',
          'Proveedor eliminado exitosamente.')
        }
        this.consultarProv()
      },
      error => {
        this.mostrarDialog(
          'Error',
          'Hubo un error al intentar de eliminar proveedor.')
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




  filtrarLista() {
    const filtroLimpio = this.filtro.trim();

    this.listaProveedores = this.listaCompletaProveedor.filter(item =>
      item.nombre_empresa.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
      item.nombre_contacto.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
      item.correo_electronico.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
      item.telefono.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
      item.direccion.toLowerCase().includes(filtroLimpio.toLowerCase())
    );
  }

  editarProveedor(id:number){
    this.router.navigate(['proveedores/editarProveedor//' +
    id
    ]); 
  }

  
usuario = "" + localStorage.getItem('usuario');



}
