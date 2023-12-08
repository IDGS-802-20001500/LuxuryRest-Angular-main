import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from
'@angular/material/dialog';
import { Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
 
@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent {
  activarFiltro: boolean = true; 
listaRecetas:Array<any>=[{}]
ordenAscendente = true;
filtro:string='';
listaCompletaReceta: Array <any>=[{}]


listaMaterias:Array<any>=[{}]
listaProductos:Array<any>=[{}]

usuario:string=""

constructor(public conexiones:ConexionServiceService, private router: Router){
  this.consultarProv()
  this.usuario = "" + localStorage.getItem('usuario');
  this.consultarMateria();
 
}

consultarProv()
{this.conexiones.getReceta().subscribe({
next: response=>{
this.listaRecetas=response;
console.log(this.listaRecetas);
this.listaCompletaReceta = this.listaRecetas;
}, 
error: error=>console.log(error)
})}


consultar() {
  
  this.conexiones.getProductos().subscribe({
    next: response => {
      this.listaProductos = response;
      console.log('Lista completa de productos:', this.listaProductos);
    },
    error: error => console.log(error)
  })
}

consultarMateria() {
  this.consultar();
  this.conexiones.getMateriaPrima().subscribe({
    next: (response) => {
      this.listaMaterias = response;
      console.log('Lista completa de Materias Primas:', this.listaMaterias);
    },
    error: (error) => console.log(error),
  });
}
ordenarListaAlfabeticamente() {
  this.ordenAscendente = !this.ordenAscendente;

  this.listaRecetas.sort((a, b) => {
    const nombreA = this.getNombreProducto(a.id_producto).toUpperCase();
    const nombreB = this.getNombreProducto(b.id_producto).toUpperCase();

    if (this.ordenAscendente) {
      return nombreA.localeCompare(nombreB);
    } else {
      return nombreB.localeCompare(nombreA);
    }
  });
}

getNombreProducto(idProducto: number): string {
  const producto = this.listaProductos.find(producto => producto.id_producto === idProducto);
  return producto ? producto.nombre : '';
}

filtrarLista() {
  const filtroLimpio = this.filtro.trim().toLowerCase();
  this.listaRecetas = this.listaCompletaReceta.filter(item => {
    const materiaPrima = this.listaMaterias.find(materia => materia.id_materia_prima === item.id_materia_prima);
    const producto = this.listaProductos.find(producto => producto.id_producto === item.id_producto);
    if (materiaPrima && producto) {
      return materiaPrima.nombre.toLowerCase().includes(filtroLimpio) ||
             producto.nombre.toLowerCase().includes(filtroLimpio);
    }
    return false;
  });
}



editarReceta(id_receta:number){
  this.router.navigate(['/receta/editarReceta/' +
  id_receta 
  ]); 
}

}
 