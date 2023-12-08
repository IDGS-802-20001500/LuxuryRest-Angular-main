import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-valoracion-producto',
  templateUrl: './valoracion-producto.component.html',
  styleUrls: ['./valoracion-producto.component.css']
})
export class ValoracionProductoComponent {
  @Input() valoracion!:number;

  @Output() valaoracionClick:EventEmitter<string>=new EventEmitter();

  puntosVal!:number;

  ngOnChanges(): void {
    this.puntosVal=this.valoracion*76/10;
  }
  onClick(){
    this.valaoracionClick.emit(`${this.valoracion}`);
  }

}
