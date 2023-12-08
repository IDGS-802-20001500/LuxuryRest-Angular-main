import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-mensaje',
  templateUrl: './dialog-mensaje.component.html',
  styleUrls: ['./dialog-mensaje.component.css']
})
export class DialogMensajeComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}