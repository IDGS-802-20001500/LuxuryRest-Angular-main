import { Component } from '@angular/core';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { User } from 'src/app/interfaces/user';
import {AES, enc} from 'crypto-ts'
import { Router } from '@angular/router';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {

  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  active: number = 1;
  currentDate = new Date();
  confirmed_at: Date = new Date();


  constructor(
    private conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
    ){}

  registrar() {
    const datos = this.construirDatos();
    this.conexiones.crearUsuario(datos).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);
        this.mostrarDialog(
          'Éxito',
          'Usuario registrado exitosamente.'
        );
        this.router.navigate(['usuarios']); 
      },
      (error) => {
        console.error('Error al crear el usuario', error);
        this.mostrarDialog(
          'Error',
          'Hubo un error al intentar de registrar usuarios.'
        );
        this.router.navigate(['usuarios']); 
      }
    );
  }

  secretKey='luxuryrest'


  // Función para mostrar el diálogo
  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
    });
  }

  usuario = "" + localStorage.getItem('usuario');

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
