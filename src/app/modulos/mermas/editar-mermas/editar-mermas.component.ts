import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Merma } from 'src/app/interfaces/merma';

@Component({
  selector: 'app-editar-mermas',
  templateUrl: './editar-mermas.component.html',
  styleUrls: ['./editar-mermas.component.css'],
})
export class EditarMermasComponent {
  listaProductos: Array<any> = [{}];
  listaProductoSel: Array<any> = [{}];
  listaCompletaProductos: Array<any> = [{}];
  listaMermas: Array<any> = [{}];
  listaCompletaMermas: Array<any> = [{}];
  cantidadMerma: number = 0;
  descripcion: string = '';

  id_productoSel: number = 0;
  id_merma: number = 0;

  currentDate = new Date();

  nombre: string = '';
  descripcionProducto: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  constructor(
    private route: ActivatedRoute,
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
  ) {
    let parametros_recibidos: any = this.route.snapshot.params;
    this.id_merma = parametros_recibidos.id_producto;
  }

  editar() {
    const datos = this.construirDatosMerma();
    this.conexiones.editarProducto(this.id_merma, datos).subscribe({
      next: (response) => {
        console.log('merma editado con éxito', response);
        // Redireccionar a la lista de productos u otras acciones necesarias
        this.mostrarDialog(
          'Éxito',
          'Merma registrada exitosamente.'
        );
        this.router.navigate(['mermas']);
      },
      error: (error) => {
        console.error('Error al editar merma', error);

        this.mostrarDialog(
          'Error',
          'Hubo un error al intentar de registrar merma.'
        );
        this.router.navigate(['mermas']);

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

  construirDatosMerma(): any {
    const formattedDate = this.currentDate.toISOString().slice(0, 10);
    const datos: Merma = {
      id_perecedero: 0,
      id_producto: this.id_productoSel,
      descripcion: this.descripcion,
      cantidad_perdida: this.cantidadMerma,
      fecha_registro: formattedDate,
    };
    return datos;
  }

  //________________________________________________produuctos____________________________
}
