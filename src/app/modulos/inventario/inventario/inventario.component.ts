import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from
'@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
}) 
export class InventarioComponent {
  activarFiltro: boolean = true; 
listaInventario:Array<any>=[{}]
ordenAscendente = true;
filtro:string=''; 
listaCompletaInventario: Array <any>=[{}]
listaMateriaPrima:Array<any>=[{}]
listaCompletaMateriasPrimas: Array <any>=[{}]

 

constructor(public conexiones:ConexionServiceService, private router: Router){
  this.consultarMateriasPrimas()
  this.consultarInventario()
}



usuario = "" + localStorage.getItem('usuario');

consultarInventario()
{this.conexiones.getInventario().subscribe({
next: response=>{
this.listaInventario=response;
console.log(this.listaInventario);
this.listaCompletaInventario = this.listaInventario;
}, 
error: error=>console.log(error)
})}


consultarMateriasPrimas()
{this.conexiones.getMateriaPrima().subscribe({
next: response=>{
this.listaMateriaPrima=response;
console.log(this.listaMateriaPrima);
this.listaCompletaMateriasPrimas = this.listaMateriaPrima;
}, 
error: error=>console.log(error)
})}





editarInventario(id_inventario:number){
  this.router.navigate(['/inventario/editarInventario/' +
  id_inventario 
  ]); 
}




}
 