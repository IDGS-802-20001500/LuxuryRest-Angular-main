import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from
'@angular/material/dialog';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ConexionServiceService } from 'src/app/conexion-service.service';

@Component({
  selector: 'app-historial-ventas',
  templateUrl: './historial-ventas.component.html',
  styleUrls: ['./historial-ventas.component.css']
})
export class HistorialVentasComponent {
  activarFiltro: boolean = true; 
listaVentas:Array<any>=[{}]
ordenAscendente = true;
filtro:string='';
listaCompletaVentas:  Array <any>=[{}]


usuario = "" + localStorage.getItem('usuario');

listaUser:Array<any>=[{}]
listaCompletaUser: Array <any>=[{}]

constructor(public conexiones:ConexionServiceService){
  this.consultarVentas();
  this.consultarUsers();
}

aplicarFiltroPorFecha(event: any) {
  const fechaSeleccionada = event.target.value;

  if (!fechaSeleccionada) {
    this.listaVentas = this.listaCompletaVentas;
    return;
  }

  this.listaVentas = this.listaCompletaVentas.filter(venta =>
    new Date(venta.fecha_hora_venta).toDateString() === new Date(fechaSeleccionada).toDateString()
  );
}

consultarUsers()
{this.conexiones.getUsuarios().subscribe({
next: response=>{
this.listaUser=response;
console.log(this.listaUser);
this.listaCompletaUser = this.listaUser;
}, 
error: error=>console.log(error)
})}



consultarVentas()
{this.conexiones.getVentas().subscribe({
next: response=>{
this.listaVentas=response;
console.log(this.listaVentas
);
this.listaCompletaVentas  = this.listaVentas;
}, 
error: error=>console.log(error)
})}







}
 