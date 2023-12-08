import { Component } from '@angular/core';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { MateriaPrima } from 'src/app/interfaces/materia-prima';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-agregar-materia',
  templateUrl: './agregar-materia.component.html',
  styleUrls: ['./agregar-materia.component.css'],
})
export class AgregarMateriaComponent {
  id_usuario = Number(localStorage.getItem('id_usuario'));
  id_proveedor: number=0;
  nombre_empresa: string = '';
  nombre_contacto: string = '';
  correo_electronico: string='';
  telefono: string='';
  direccion: string='';
  Activo: number= 1;

  listaIdNombreProveedores: Array<any> = [{}];
  listaCompletaProveedores: Array<any> = [{}];
  listaProveedores: Array<any> = [{}];
  opcionSeleccionada: number = 0;

  id_materia_prima: number = 0;
  nombre: string = '';
  cantidad_comprada: number = 0;
  unidad_medida: string='';
  cantidad_minima_requerida: number=0;
  precio_compra: number=0.0;

  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    this.consultarProveedores();
  }

  consultarProveedores() {
    this.conexiones.getProveedores().subscribe({
      next: (response) => {
        this.listaProveedores = response;
        console.log(this.listaProveedores);
        this.listaCompletaProveedores = this.listaProveedores;
        this.listaIdNombreProveedores = this.listaProveedores;
        console.log(this.listaIdNombreProveedores);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatos(id_proveedor: number) {
    alert(this.opcionSeleccionada);
    // Encuentra el producto en la lista por su ID
    const proveedorEncontrado = this.listaIdNombreProveedores.find(
      (proveedor) => proveedor.id_proveedor == this.opcionSeleccionada
    );
    console.log('2 cosa' + proveedorEncontrado);
    // Guarda los campos del producto en variables
    this.id_proveedor = proveedorEncontrado.id_proveedor;
    this.nombre_empresa = proveedorEncontrado.nombre_empresa;
    this.nombre_contacto = proveedorEncontrado.nombre_contacto;
    this.correo_electronico = proveedorEncontrado.correo_electronico;
    this.telefono = proveedorEncontrado.telefono;
    this.direccion = proveedorEncontrado.direccion;
    this.Activo = proveedorEncontrado.Activo;

    console.log('Proveedor encontrada:', this.nombre_empresa);
    console.log('Proveedor encontrada:', this.id_proveedor);
  }


usuario = "" + localStorage.getItem('usuario');
  agregarMateriaPrima() {
    const datos = this.construirDatosMateria();

    this.conexiones.agregarMateriaPrima(datos).subscribe(
      (response) => {
        console.log('Materia prima agregada con éxito:', response);
        this.mostrarDialog(
          'Éxito',
          'La materia prima se ha agregado correctamente.'
        );
        this.router.navigate(['materiaPrima']);
        // Realizar acciones adicionales después de agregar
      },
      (error) => {
        console.error('Error al agregar materia prima:', error);
        this.mostrarDialog(
          'Error',
          'Ha ocurrido un error al agregar la materia prima.'
        );
        this.router.navigate(['materiaPrima']);
        // Manejar el error
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

  construirDatosMateria(): any {
    const datos: MateriaPrima = {
      id_materia_prima: 0,
      id_proveedor: this.id_proveedor,
      nombre: this.nombre,
      unidad_medida: this.unidad_medida,
      cantidad_minima_requerida: this.cantidad_minima_requerida,
      precio_compra: this.precio_compra,
      Activo:Boolean(1) ,
    };
    console.log(datos);
    return datos;
  }
}
