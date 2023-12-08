import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Importa el servicio Router
import { ConexionServiceService } from 'src/app/conexion-service.service';

@Component({
  selector: 'app-mermas',
  templateUrl: './mermas.component.html',
  styleUrls: ['./mermas.component.css']
})
export class MermasComponent {

  filtro:string=""
  listaProductos: Array<any> = [{}]
  listaCompletaProductos: Array<any> = [{}]
  listaMermas: Array<any> = [{}]
  listaCompletaMermas: Array<any> = [{}]
  
usuario = "" + localStorage.getItem('usuario');

  constructor(public conexiones: ConexionServiceService, private router: Router) {
    this.consultar()
  }

  consultar() {
    this.conexiones.getProductos().subscribe({
      next: response => {
        this.listaProductos = response;
        this.listaCompletaProductos = this.listaProductos
        this.consultarMermas()
      },
      error: error => console.log(error)
    })
  }

  consultarMermas() {
    this.conexiones.getMermas().subscribe({
      next: response => {
        this.listaMermas = response;
        this.listaCompletaMermas = this.listaMermas
      },
      error: error => console.log(error)
    })
  }

  eliminarMerma(id_Merma:number, id_producto:number){

  }





}
