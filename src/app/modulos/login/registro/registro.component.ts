import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ConexionServiceService } from 'src/app/conexion-service.service';

import { User } from 'src/app/interfaces/user';
import {AES, enc} from 'crypto-ts'
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent {
  formulario!: FormGroup;

  id: number = 0;
  name: string = '';
  email: string = '';
  password: string = '';
  active: number = 1;
  currentDate = new Date();
  confirmed_at: Date = new Date();

  usuario = { nombre: '', email: '', contrasenia: '' };

  constructor(public conexiones: ConexionServiceService,
    private dialog: MatDialog, // Inyecta MatDialog
    private router: Router // Inyecta Router
    ) {
    this.formulario = new FormGroup({

      nombre: new FormControl(this.usuario.nombre, [
        Validators.required,
        Validators.minLength(4),
      ]),


      correo: new FormControl(this.usuario.email, [
        Validators.required,
        Validators.minLength(4),
      ]),


      contrasenia: new FormControl(this.usuario.contrasenia, [
        Validators.required,
        Validators.minLength(4),
      ]),


    });
  }



  get nombre(){return this.formulario.get('nombre')!;}
  get correo(){return this.formulario.get('email')!;}
  get contrasenia(){return this.formulario.get('contrasenia')!;}





  // Función para mostrar el diálogo
  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
    });
  }


  registrar() {
    const datos = this.construirDatos();
    this.conexiones.crearUsuario(datos).subscribe(
      (response) => {
        console.log('Usuario creado con éxito', response);

        this.mostrarDialog(
          'Éxito',
          'Usuario creado correctamente.'
        );
        this.router.navigate(['login']);
      },
      (error) => {
        console.error('Error al crear el usuario', error);

        this.mostrarDialog(
          'Error',
          'Hubo un error al intentar de crear un usuario.'
        );
        this.router.navigate(['login']);
      }
    );
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
