import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConexionServiceService } from 'src/app/conexion-service.service';
import { DialogMensajeComponent } from 'src/app/dialog-mensaje/dialog-mensaje.component';
import { MateriaPrima } from 'src/app/interfaces/materia-prima';

@Component({
  selector: 'app-editar-materia',
  templateUrl: './editar-materia.component.html',
  styleUrls: ['./editar-materia.component.css'],
})
export class EditarMateriaComponent {
  id_proveedor: number = 0;
  nombre_empresa: string = '';
  nombre_contacto: string = '';
  correo_electronico: string = '';
  telefono: string = '';
  direccion: string = '';
  Activo: number = 1;

  listaIdNombreProveedores: Array<any> = [{}];
  listaCompletaProveedores: Array<any> = [{}];
  listaProveedores: Array<any> = [{}];
  opcionSeleccionada: number = 0;

  listaMateriaPrima: Array<any> = [{}];
  listaCompletaMateriasPrimas: Array<any> = [{}];

  id_materia_prima: number = 0;
  nombre: string = '';
  cantidad_comprada: number = 0;
  unidad_medida: string = '';
  cantidad_minima_requerida: number = 0;
  precio_compra: number = 0.0;

  constructor(
    private conexiones: ConexionServiceService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private router: Router
  ) {
    this.consultarProveedores();
    let parametros_recibidos: any = this.route.snapshot.params;
    this.id_materia_prima = parametros_recibidos.id_materia_prima;

    this.consultarPorId(this.id_materia_prima);
  }
  consultarporId(id: number) {
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMateriaPrima = response;
        // Filtra la materia prima correspondiente al ID de la ruta
        const materiaEncontrada = this.listaMateriaPrima.find(
          (materia) => materia.id_materia_prima === id
        );

        // Si se encuentra la materia prima, carga los datos correspondientes
        if (materiaEncontrada) {
          this.id_materia_prima = materiaEncontrada.id_materia_prima;
          this.id_proveedor = materiaEncontrada.id_proveedor;
          this.nombre = materiaEncontrada.nombre;
          this.unidad_medida = materiaEncontrada.unidad_medida;
          this.cantidad_minima_requerida =
            materiaEncontrada.cantidad_minima_requerida;
          this.precio_compra = materiaEncontrada.precio_compra;

          // Además, puedes buscar y cargar los datos del proveedor si es necesario

          // ...
        }
      },
      error: (error) => console.log(error),
    });
  }

  consultarProveedores() {
    this.conexiones.getProveedores().subscribe({
      next: (response) => {
        this.listaProveedores = response;
        console.log(this.listaProveedores);
        this.listaCompletaProveedores = this.listaProveedores;
        this.listaIdNombreProveedores = this.listaProveedores;
        console.log(this.listaIdNombreProveedores);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatos(id_proveedor: number) {
    alert(this.opcionSeleccionada);
    // Encuentra el producto en la lista por su ID
    const proveedorEncontrado = this.listaIdNombreProveedores.find(
      (proveedor) => proveedor.id_proveedor == this.opcionSeleccionada
    );
    console.log('2 cosa' + proveedorEncontrado);
    // Guarda los campos del producto en variables
    this.id_proveedor = proveedorEncontrado.id_proveedor;
    this.nombre_empresa = proveedorEncontrado.nombre_empresa;
    this.nombre_contacto = proveedorEncontrado.nombre_contacto;
    this.correo_electronico = proveedorEncontrado.correo_electronico;
    this.telefono = proveedorEncontrado.telefono;
    this.direccion = proveedorEncontrado.direccion;
    this.Activo = proveedorEncontrado.Activo;

    console.log('Proveedor encontrada:', this.nombre_empresa);
    console.log('Proveedor encontrada:', this.id_proveedor);
  }

  consultarPorId(id: number) {
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMateriaPrima = response;
        this.consultarMateriasPrimas(id);
      },
      error: (error) => console.log(error),
    });
  }

  consultarMateriasPrimas(id: number) {
    this.conexiones.getMateriaPrima().subscribe({
      next: (response) => {
        this.listaMateriaPrima = response;
        console.log(this.listaMateriaPrima);
        this.listaCompletaMateriasPrimas = this.listaMateriaPrima;
        this.cargarDatosDeConsulta(id);
      },
      error: (error) => console.log(error),
    });
  }

  cargarDatosDeConsulta(id: number) {
    const materiaEncontrado = this.listaMateriaPrima.find(
      (materia) => materia.id_materia_prima == id
    );

    this.id_materia_prima = materiaEncontrado.id_materia_prima;
    console.log(this.id_materia_prima);
    this.id_proveedor = materiaEncontrado.id_proveedor;
    this.nombre = materiaEncontrado.nombre;
    this.unidad_medida = materiaEncontrado.unidad_medida;
    this.cantidad_minima_requerida =
      materiaEncontrado.cantidad_minima_requerida;
    this.precio_compra = materiaEncontrado.precio_compra;

    // Encuentra el proveedor correspondiente por su ID
    const proveedorEncontrado = this.listaProveedores.find(
      (proveedor) => proveedor.id_proveedor === this.id_proveedor
    );

    // Asigna los datos del proveedor a las propiedades correspondientes
    this.opcionSeleccionada = proveedorEncontrado.id_proveedor;
    this.nombre_empresa = proveedorEncontrado.nombre_empresa;
    this.nombre_contacto = proveedorEncontrado.nombre_contacto;
    this.correo_electronico = proveedorEncontrado.correo_electronico;
    this.telefono = proveedorEncontrado.telefono;
    this.direccion = proveedorEncontrado.direccion;
    this.Activo = proveedorEncontrado.Activo;
  }

  // Función para mostrar el diálogo
  mostrarDialog(titulo: string, mensaje: string): void {
    const dialogRef = this.dialog.open(DialogMensajeComponent, {
      data: { titulo, mensaje },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Diálogo cerrado', result);
    });
  }

  usuario = '' + localStorage.getItem('usuario');
  editar() {
    debugger;
    const datos = this.construirDatosMateria();
    this.conexiones.editarMateriaPrima(this.id_materia_prima, datos).subscribe({
      next: (response) => {
        console.log('Materia prima editado con éxito', response);
        this.mostrarDialog('Éxito', 'Materia prima editada exitosamente.');
        this.eliminarMateriaPrimaDeLista(this.id_materia_prima);
        this.router.navigate(['materiaPrima']);
        // Redireccionar a la lista de productos u otras acciones necesarias
      },
      error: (error) => {
        console.error('Error al editar la materia prima', error);
        this.mostrarDialog(
          'Error',
          'Hubo un error al intentar de editar la materia prima.'
        );
        this.router.navigate(['materiaPrima']);
      },
    });
  }

  eliminarMateriaPrimaDeLista(idMateriaPrima: number): void {
    // Encuentra el índice del elemento en la lista
    const indice = this.listaCompletaMateriasPrimas.findIndex(
      (materia) => materia.id_materia_prima === idMateriaPrima
    );

    // Elimina el elemento de la lista
    if (indice !== -1) {
      this.listaCompletaMateriasPrimas.splice(indice, 1);
    }
  }

  construirDatosMateria(): any {
    const datos: MateriaPrima = {
      id_materia_prima: this.id_materia_prima,
      id_proveedor: this.id_proveedor,
      nombre: this.nombre,
      unidad_medida: this.unidad_medida,
      cantidad_minima_requerida: this.cantidad_minima_requerida,
      precio_compra: this.precio_compra,
      Activo: Boolean(1),
    };
    console.log(datos);
    return datos;
  }
}
