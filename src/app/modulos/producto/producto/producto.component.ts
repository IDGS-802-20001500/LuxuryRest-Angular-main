import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from
  '@angular/material/dialog';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { Router } from '@angular/router'; // Importa el servicio Router
import { Producto } from 'src/app/interfaces/producto';
import { CustomAlertComponent } from 'src/app/custom-alert/custom-alert.component';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  activarFiltro: boolean = true;
  listaProductos: Array<any> = [{}]
  ordenAscendente = true;
  filtro: string = '';
  listaCompletaProducto: Array<any> = [{}]
  productoSeleccionado: Array<any> = [{}]

  id_producto: number = 0;
  nombre: string = ''; 
  descripcion: string = '';
  imagen: string = '';
  precio_venta: number = 0;
  cantidad_disponible: number = 0;
  valoracionT: number = 0;
  valoracionC: number = 0;
  estatus: number = 0;

  constructor(public conexiones: ConexionServiceService,
    public dialog: MatDialog,
     private router: Router) {
    this.consultar()
  }

  consultar() {
    this.conexiones.getProductos().subscribe({
      next: response => {
        this.listaProductos = response;
        this.listaCompletaProducto = this.listaProductos;
      },
      error: error => console.log(error)
    })
  }

  ordenarListaAlfabeticamente() {
    this.ordenAscendente = !this.ordenAscendente;

    this.listaProductos.sort((a, b) => {
      const nombreA = a.nombre.toUpperCase();
      const nombreB = b.nombre.toUpperCase();

      if (this.ordenAscendente) {
        return nombreA.localeCompare(nombreB);
      } else {
        return nombreB.localeCompare(nombreA);
      }
    });
  }

  filtrarLista() {
    const filtroLimpio = this.filtro.trim();
    this.listaProductos = this.listaCompletaProducto.filter(item =>
      item.nombre.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(filtroLimpio.toLowerCase()) ||
      item.precio_venta.toString().includes(filtroLimpio) ||
      item.cantidad_disponible.toString().includes(filtroLimpio) ||
      item.valoracionT.toString().includes(filtroLimpio) ||
      item.valoracionC.toString().includes(filtroLimpio)
    );
  }

  editarProducto(id_producto: number) {
    this.router.navigate(['/producto/editarProducto/' +
      id_producto
    ]);
  }





  construirDatosProducto(): any {
    const datos: Producto = {
      id_producto: this.id_producto,
      nombre: this.nombre,
      descripcion: this.descripcion,
      imagen: this.imagen,
      precio_venta: this.precio_venta,
      cantidad_disponible: this.cantidad_disponible,
      valoracionT: this.valoracionT,
      valoracionC: this.valoracionC,
      estatus: this.estatus,
    };
    return datos;
  }


  eliminarProducto(id: number, estatus: number) {

    const productoEncontrado = this.listaCompletaProducto.find(
      (producto) => producto.id_producto == id
    );


    this.id_producto = id
    this.nombre = productoEncontrado.nombre
    this.descripcion = productoEncontrado.descripcion
    this.imagen = productoEncontrado.imagen
    this.precio_venta = productoEncontrado.precio_venta
    this.cantidad_disponible = productoEncontrado.cantidad_disponible
    this.valoracionT = productoEncontrado.valoracionT
    this.valoracionC = productoEncontrado.valoracionC
    this.estatus = estatus

    const datos = this.construirDatosProducto();

    this.conexiones.editarProducto(id, datos).subscribe(
      response => {

        if (estatus) {

          this.mostrarDialog('Éxito', 'Producto activado exitosamente.');
          
        this.router.navigate(['producto']);
        }
        else {

          this.mostrarDialog('Éxito', 'Producto eliminado exitosamente.');
        }
        this.consultar();
        
        this.router.navigate(['producto']);
      },
      error => {
        this.mostrarDialog('Error', 'Hubo un error al intentar de eliminar el producto.');
        
        this.router.navigate(['producto']);
      },
    );
    }



  
  openEliminarAlert(id: number, estatus: number) {
    const dialogRef = this.dialog.open(CustomAlertComponent, {
      width: '400px',
      data: {
        title: 'Eliminar Producto',
        message: '¿Estás seguro de que deseas eliminar este producto?',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Si el usuario hace clic en "Aceptar", llama a la función eliminar
        this.eliminarProducto(id, estatus);
      }   
    });
  }
  
  

usuario = "" + localStorage.getItem('usuario');
  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

}}