import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { CustomAlertComponent } from 'src/app/custom-alert/custom-alert.component';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { MateriaPrima } from 'src/app/interfaces/materia-prima';

@Component({
  selector: 'app-materia-prima',
  templateUrl: './materia-prima.component.html',
  styleUrls: ['./materia-prima.component.css'],
})
export class MateriaPrimaComponent {
  activarFiltro: boolean = true;
  listaMateria: Array<any> = [{}];
  ordenAscendente = true;
  filtro: string = '';
  listaCompletaMateria: Array<any> = [{}];

  id_materia_prima: number = 0;
  nombre: string = '';
  cantidad_comprada: number = 0;
  unidad_medida: string = '';
  cantidad_minima_requerida: number = 0;
  precio_compra: number = 0.0;
  id_proveedor: number = 0;
  Activo: boolean = true; // O false si deseas que esté inactivo por defecto

  listaMateriaPrima: Array<any> = [{}];
  listaCompletaMateriasPrimas: Array<any> = [{}];
  listaProveedores: Array<any> = [{}];
  listaCompletaProveedores: Array<any> = [{}];

  constructor(
    public conexiones: ConexionServiceService,
    public dialog: MatDialog,
    private router: Router
  ) {
    this.consultarMateria();
    this.consultarProveedores();
  }

  consultarMateria() {
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMateria = response;
        console.log('Lista completa de Materias Primas:', this.listaMateria);
        this.listaCompletaMateria = this.listaMateria;
      },
      error: (error) => console.log(error),
    });
  }

  ordenarListaAlfabeticamente() {
    this.ordenAscendente = !this.ordenAscendente;

    this.listaMateria.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();

      if (this.ordenAscendente) {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }
    });
  }

  filtrarLista() {
    console.log('Filtering...');
    const filtroLimpio = this.filtro.trim().toLowerCase();
    console.log('Filtro:', filtroLimpio);
    this.listaMateria = this.listaCompletaMateria.filter(
      (item) =>
        item.nombre.toLowerCase().includes(filtroLimpio) ||
        item.unidad_medida.toLowerCase().includes(filtroLimpio)
    );
    console.log('Filtered List:', this.listaMateria);
  }

  activarMateria() {}

  consultarProveedores() {
    this.conexiones.getProveedores().subscribe({
      next: (response) => {
        this.listaProveedores = response;
        console.log(this.listaProveedores);
        this.listaCompletaProveedores = this.listaProveedores;
      },
      error: (error) => console.log(error),
    });
  }

  editarMateria(id_materia_prima: number) {
    debugger;
    this.router.navigate(['/materiaPrima/editarMateria/' + id_materia_prima]);
  }

  usuario = '' + localStorage.getItem('usuario');

  eliminar(id_materia_prima: number) {
    // Lógica para actualizar el registro a Activo = 0
    // ...
    this.conexiones.eliminarMateriaPrima(id_materia_prima).subscribe({
      next: (response) => {
        console.log('Materia prima eliminada con éxito', response);
        // Aquí puedes recargar la lista de materias primas si es necesario
      },
      error: (error) => {
        console.error('Error al eliminar la materia prima', error);
      },
    });

    console.log('Registro eliminado:', id_materia_prima);
    this.mostrarDialog('Éxito', 'Materia prima eliminada exitosamente.');

    this.router.navigate(['materiaPrima']);
  }

  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
      // Aquí puedes realizar alguna acción después de cerrar el diálogo, si es necesario
    });
  }

  openEliminarAlert(id_materia_prima: number) {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Materia Prima',
        message: '¿Estás seguro de que deseas eliminar esta materia prima?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el usuario hace clic en "Aceptar", llama a la función eliminar
        this.eliminar(id_materia_prima);
      }
    });
  }

  eliminarMateria(id_materia_prima: number) {
    console.log('ID:s');
    console.log(id_materia_prima);
    this.openEliminarAlert(id_materia_prima);
  }
}
