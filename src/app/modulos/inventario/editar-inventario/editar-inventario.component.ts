import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { Inventario } from 'src/app/interfaces/inventario';

@Component({
  selector: 'app-editar-inventario',
  templateUrl: './editar-inventario.component.html',
  styleUrls: ['./editar-inventario.component.css'],
})
export class EditarInventarioComponent {
  id_inventario: number = 0;

  listaInventario: Array<any> = [{}];

  id_materia_prima: number = 0;
  cantidad_almacenada: number = 0;
  listaMateriaPrima: Array<any> = [{}];
  listaCompletaMateriasPrimas: Array<any> = [{}];
  nombreMateria:string='';


  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private conexiones: ConexionServiceService,
    private router: Router
  ) {
    let parametros_recibidos: any = this.route.snapshot.params;
    this.id_inventario = parametros_recibidos.id_inventario;

    this.consultarPorId(parametros_recibidos.id_inventario);
    
  }

  consultarPorId(id: number) {
    this.conexiones.getInventario().subscribe({
      next: (response) => {
        this.listaInventario = response;
        this.consultarMateriasPrimas(id);


        
      },
      error: (error) => console.log(error),
    });
  }

  consultarMateriasPrimas(id:number) { 
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMateriaPrima = response;
        console.log(this.listaMateriaPrima);
        this.listaCompletaMateriasPrimas = this.listaMateriaPrima;
        this.cargarDatosDeConsulta(id);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatosDeConsulta(id: number) {
    const inventarioEncontrado = this.listaInventario.find(
      (inventario) => inventario.id_inventario == id
    );

    this.id_inventario = inventarioEncontrado.id_inventario;
    this.id_materia_prima = inventarioEncontrado.id_materia_prima;
    this.cantidad_almacenada = inventarioEncontrado.cantidad_almacenada;

    
    const materiaEncontrado = this.listaMateriaPrima.find(
      (materia) => materia.id_materia_prima == this.id_materia_prima
    );
    this.nombreMateria=materiaEncontrado.nombre
  }
 
  editar() {
    const datos = this.construirDatosInventario();
    this.conexiones.editarInventario(this.id_inventario, datos).subscribe({
      next: (response) => {
        console.log('Inventario editado con éxito', response);
        this.mostrarDialog('Éxito', 'Inventario editado exitosamente.');
        this.router.navigate(['inventario']);
        // Redireccionar a la lista de productos u otras acciones necesarias
      },
      error: (error) => {
        console.error('Error al editar el inventario', error);
        this.mostrarDialog('Error', 'Hubo un error al intentar de editar inventario.');
        this.router.navigate(['inventario']);
      },
    });
  }


  


usuario = "" + localStorage.getItem('usuario');

  construirDatosInventario(): any {
    const datos: Inventario = {
      id_inventario: this.id_inventario,
      id_materia_prima: this.id_materia_prima,
      cantidad_almacenada: this.cantidad_almacenada,
    };
    return datos;
  }



  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });}

}
