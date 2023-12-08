import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { User } from 'src/app/interfaces/user';
import { UserRoles } from 'src/app/interfaces/user-roles';
import {AES, enc} from 'crypto-ts'

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.css']
})
export class EditarUsuarioComponent {

  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  active: number = 1;
  currentDate = new Date();
  confirmed_at: Date = new Date();


  usuario = "" + localStorage.getItem('usuario');

  constructor(
    private route: ActivatedRoute,
    private conexiones: ConexionServiceService,
    private router: Router

  ) {
    let parametros_recibidos: any = this.route.snapshot.params;
    this.id = parametros_recibidos.id;
    this.name=parametros_recibidos.name;
    this.email=parametros_recibidos.email;
    this.password= AES.decrypt(parametros_recibidos.password,  this.secretKey).toString(enc.Utf8)
  }


  editar(){
    const datos = this.construirDatos();
    this.conexiones.editarUsuario(this.id, datos).subscribe({
      next: (response) => {
        console.log('edicion editado con éxito', response);
        alert("editado")
      this.router.navigate(['usuarios']); 
        // Redireccionar a la lista de productos u otras acciones necesarias
      },
      error: (error) => {
        console.error('Error al editar el producto', error);
        alert("no editado")
      },
    });
  }
  
  secretKey='luxuryrest'
  
  
  
    construirDatos(): User {
      const formattedDate = this.currentDate.toISOString().slice(0, 10);
      const contraEncriptada = "" + AES.encrypt(this.password, this.secretKey)
      const datos: User = {
        id: this.id,
        name: this.name,
        email: this.email,
        password: contraEncriptada,
        active: true,
        confirmed_at: formattedDate, // Formatear a ISO 8601
      };
      return datos;
    }
}
