import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router'; // Importa el servicio Router
import { ConexionServiceService } from '../conexion-service.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  usuario: string = ''
  id_usuario:number=0;
  rol:string=""

  ngOnInit() {
    // Suscribirse al observable para detectar cuando debe recargarse
    this.conexiones.refresh$.subscribe(() => {
      this.usuario = '' + localStorage.getItem('usuario');
    
    this.id_usuario = Number(localStorage.getItem('id_usuario'));
    
    this.rol = '' + localStorage.getItem('rol');
    });
  }

  constructor(private router: Router, 
    private conexiones: ConexionServiceService) {
    this.usuario = '' + localStorage.getItem('usuario');
    
    this.id_usuario = Number(localStorage.getItem('id_usuario'));
    
    this.rol = '' + localStorage.getItem('rol');
  }

  cerrarSesion() {
    localStorage.setItem('usuario', '');
    localStorage.setItem('id_usuario', '');
    localStorage.setItem('rol', '');

      this.router.navigate(['/home'])

      this.conexiones.triggerRefresh();

    
  }
}
