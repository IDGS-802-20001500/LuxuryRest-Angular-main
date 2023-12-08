import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from
'@angular/material/dialog';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { User } from 'src/app/interfaces/user';
import {AES, enc} from 'crypto-ts'
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent {
  activarFiltro: boolean = true; 
listaUsers:Array<any>=[{}]
ordenAscendente = true;
filtro:string='';
listaCompletaUser: Array <any>=[{}]
listaRoles: Array<any> = [{}];

  listaRolesUsuario: Array<any> = [{}];



  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  active: number = 1;
  currentDate = new Date();
  confirmed_at: Date = new Date();



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


constructor(public conexiones:ConexionServiceService, private router: Router,){
  this.consultarUser()
}

consultarUser()
{this.conexiones.getUsuarios().subscribe({
next: response=>{
this.listaUsers=response;
console.log(this.listaUsers);
this.consultarRolesUsuario()
this.listaCompletaUser = this.listaUsers;
}, 
error: error=>console.log(error)
})}





ordenarListaAlfabeticamente() {
  this.ordenAscendente = !this.ordenAscendente;

  this.listaUsers.sort((a, b) => {
    const nombreA = a.name.toUpperCase();
    const nombreB = b.name.toUpperCase();

    if (this.ordenAscendente) {
      return nombreA.localeCompare(nombreB);
    } else {
      return nombreB.localeCompare(nombreA);
    }
  });
}

filtrarLista() {
  const filtroLimpio = this.filtro.trim();
  this.listaUsers = this.listaCompletaUser.filter(item =>
    item.name.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
    item.email.toLowerCase().includes(filtroLimpio.toLowerCase())
  );
}


eliminar(id:number,name:string, email:string, password:string, active:boolean){
  const datos = this.construirDatos(id, name, email, password, active);
  this.conexiones.editarUsuario(id, datos).subscribe({
    next: (response) => {
      console.log('edicion editado con éxito', response);
      alert("editado")
      this.consultarUser()
      // Redireccionar a la lista de productos u otras acciones necesarias
    },
    error: (error) => {
      console.error('Error al editar el producto', error);
      alert("no editado")
    },
  });
}

secretKey='luxuryrest'



usuario = "" + localStorage.getItem('usuario');
  construirDatos(id:number, name:string, email:string, password:string , active:boolean): User {
    const formattedDate = this.currentDate.toISOString().slice(0, 10);
    const contraEncriptada = "" + AES.encrypt(password, this.secretKey)
    const datos: User = {
      id: id,
      name: name,
      email: email,
      password: contraEncriptada,
      active: active,
      confirmed_at: formattedDate, // Formatear a ISO 8601
    };
    return datos;
  }


  editar(id:number,name:string, email:string, password:string){
    
    this.router.navigate(['usuarios/editarUsuario', id, name, email, password]);
  
  }

}
 