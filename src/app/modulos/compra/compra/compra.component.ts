import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from
'@angular/material/dialog';
import { ConexionServiceService } from 'src/app/conexion-service.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {
  activarFiltro: boolean = true; 
listaCompras:Array<any>=[{}]
ordenAscendente = true;
filtro:string='';
listaCompletaCompras:  Array <any>=[{}]
 
listaMaterias:Array<any>=[{}]

listaUser:Array<any>=[{}]
listaCompletaUser: Array <any>=[{}]

constructor(public conexiones:ConexionServiceService){
  this.consultarCompras();
  this.consultarUsers();
  this.consultarMateria();
}




usuario = "" + localStorage.getItem('usuario');

consultarCompras()
{this.conexiones.getCompras().subscribe({
next: response=>{
this.listaCompras=response;
console.log(this.listaCompras
);
this.listaCompletaCompras  = this.listaCompras;
}, 
error: error=>console.log(error)
})}


consultarUsers()
{this.conexiones.getUsuarios().subscribe({
next: response=>{
this.listaUser=response;
console.log(this.listaUser);
this.listaCompletaUser = this.listaUser;
}, 
error: error=>console.log(error)
})}


consultarMateria() {
  this.conexiones.getMateriaPrima().subscribe({
    next: (response) => {
      this.listaMaterias = response;
      console.log('Lista completa de Materias Primas:', this.listaMaterias);
    },
    error: (error) => console.log(error),
  });
}


aplicarFiltroPorFecha(event: any) {
  const fechaSeleccionada = event.target.value;

  if (!fechaSeleccionada) {
    this.listaCompras = this.listaCompletaCompras;
    return;
  }

  this.listaCompras = this.listaCompletaCompras.filter(compra =>
    new Date(compra.fecha_compra).toDateString() === new Date(fechaSeleccionada).toDateString()
  );
}





}
 