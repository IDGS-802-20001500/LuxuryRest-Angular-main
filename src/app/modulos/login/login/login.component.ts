import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { User } from 'src/app/interfaces/user';

import { Router } from '@angular/router'; // Importa el servicio Router
import {AES, enc} from 'crypto-ts'



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario: string = '';
  contrasenia: string = '';
  listaUsuarios: Array<any> = [{}];

  listaRoles: Array<any> = [{}];

  listaRolesUsuario: Array<any> = [{}];

  secretKey='luxuryrest'

  constructor(
    private router: Router,
    private conexiones: ConexionServiceService
  ) {
    this.consultarUsuarioss();
    
    
  }

  consultarUsuarioss() {
    this.conexiones.getUsuarios().subscribe({
      next: (response) => {
        this.listaUsuarios = response;
        this.consultarRolesUsuario();
      },
      error: (error) => console.log(error),
    });
  }
  consultarRoles() {
    this.conexiones.getRoles().subscribe({
      next: (response) => {
        this.listaRoles = response;
        
      },
      error: (error) => console.log(error),
    });
  }
  consultarRolesUsuario() {
    this.conexiones.getRolesUsuario().subscribe({
      next: (response) => {
        this.listaRolesUsuario = response;
          
        this.consultarRoles();
      },
      error: (error) => console.log(error),
    });
  }








  iniciarSesion() {


    const usuarioEncontrado = this.listaUsuarios.find(
      (usuario) =>
      
        usuario.email == this.usuario && AES.decrypt(usuario.password, this.secretKey).toString(enc.Utf8) + "" == this.contrasenia && usuario.active == true
    );


    const roleDeUsuario = this.listaRolesUsuario.find(
      (rolUser) => String(rolUser.userId) == String(usuarioEncontrado.id)
    );

    
    console.log("rol id" + roleDeUsuario.roleId)

    const rol = this.listaRoles.find((rol) => rol.id == roleDeUsuario.roleId);

    if (usuarioEncontrado) {
      localStorage.setItem('usuario', usuarioEncontrado.name);
      localStorage.setItem('id_usuario', usuarioEncontrado.id);
      localStorage.setItem('rol', rol.name);

      this.conexiones.triggerRefresh();

      // Después de realizar acciones necesarias, como iniciar sesión
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home']); // Cambia '/home' por la ruta actual de la barra de navegación
      });
    } else {
      alert('error');
    }
  }
}
