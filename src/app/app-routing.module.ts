import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './modulos/login/login/login.component';
import { ProductoComponent } from './modulos/producto/producto/producto.component';
import { RegistroComponent } from './modulos/login/registro/registro.component';
import { FinanzasComponent } from './modulos/finanzas/finanzas/finanzas.component';
import { CompraComponent } from './modulos/compra/compra/compra.component';
import { InventarioComponent } from './modulos/inventario/inventario/inventario.component';
import { PedidoComponent } from './modulos/pedido/pedido/pedido.component';
import { ProveedorComponent } from './modulos/proveedor/proveedor/proveedor.component';
import { UsuarioComponent } from './modulos/usuario/usuario/usuario.component';
import { VentaComponent } from './modulos/venta/venta/venta.component';
import { MateriaPrimaComponent } from './modulos/materia_prima/materia-prima/materia-prima.component';
import { RecetaComponent } from './modulos/receta/receta/receta.component';
import { AgregarProductoComponent } from './modulos/producto/agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './modulos/producto/editar-producto/editar-producto.component';
import { AgregarProveedorComponent } from './modulos/proveedor/agregar-proveedor/agregar-proveedor.component';
import { EditarProveedorComponent } from './modulos/proveedor/editar-proveedor/editar-proveedor.component';
import { AgregarRecetaComponent } from './modulos/receta/agregar-receta/agregar-receta.component';
import { EditarRecetaComponent } from './modulos/receta/editar-receta/editar-receta.component';
import { AgregarMateriaComponent } from './modulos/materia_prima/agregar-materia/agregar-materia.component';
import { EditarMateriaComponent } from './modulos/materia_prima/editar-materia/editar-materia.component';
import { AgregarUsuarioComponent } from './modulos/usuario/agregar-usuario/agregar-usuario.component';
import { EditarUsuarioComponent } from './modulos/usuario/editar-usuario/editar-usuario.component';
import { EditarInventarioComponent } from './modulos/inventario/editar-inventario/editar-inventario.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { CompraMateriaComponent } from './modulos/compra/compra-materia/compra-materia.component';
import { CrearProductoComponent } from './modulos/producto/crear-producto/crear-producto.component';
import { PagoComponent } from './modulos/venta/pago/pago.component';
import { CarritoComponent } from './modulos/venta/carrito/carrito.component';
import { MermasComponent } from './modulos/mermas/mermas.component';
import { RegistrarMermasComponent } from './modulos/mermas/registrar-mermas/registrar-mermas.component';
import { EditarMermasComponent } from './modulos/mermas/editar-mermas/editar-mermas.component';
import { HistorialVentasComponent } from './modulos/venta/historial-ventas/historial-ventas.component';
const routes: Routes = [
  {path: '', redirectTo: "/home", pathMatch:'full'},
  {path: 'home', component: HomeComponent},
  {path: 'producto',component: ProductoComponent},
  {path: 'producto/agregarProducto',component: AgregarProductoComponent},
  {path: 'producto/editarProducto/:id_producto',component: EditarProductoComponent},
  {path: 'producto/crearProducto',component: CrearProductoComponent},
  {path: 'login', component: LoginComponent},
  {path: 'login/registro', component: RegistroComponent},
  {path: 'compras', component: CompraComponent },
  {path: 'historialVentas', component: HistorialVentasComponent },
  {path: 'compras/compraMateria', component: CompraMateriaComponent},
  {path: 'finanzas', component: FinanzasComponent },
  {path: 'inventario', component: InventarioComponent },
  {path: 'inventario/editarInventario/:id_inventario', component: EditarInventarioComponent },
  {path: 'pedidos', component: PedidoComponent },
  {path: 'proveedores', component: ProveedorComponent },
  {path: 'proveedores/agregarProveedor', component: AgregarProveedorComponent },
  {path: 'proveedores/editarProveedor/:id_proveedor', component: EditarProveedorComponent },
  {path: 'usuarios', component: UsuarioComponent },
  {path: 'usuarios/agregarUsuario', component: AgregarUsuarioComponent },
  {path: 'usuarios/editarUsuario/:id/:name/:email/:password', component: EditarUsuarioComponent },
  {path: 'ventas', component: VentaComponent },
  {path: 'ventas/carrito/pago', component: PagoComponent },
  {path: 'ventas/carrito', component: CarritoComponent },
  {path: 'materiaPrima', component: MateriaPrimaComponent},
  {path: 'materiaPrima/agregarMateria', component: AgregarMateriaComponent},
  {path: 'materiaPrima/editarMateria/:id_materia', component: EditarMateriaComponent},
  {path: 'receta', component: RecetaComponent},
  {path: 'receta/agregarReceta', component: AgregarRecetaComponent},
  {path: 'receta/editarReceta/:id_receta', component: EditarRecetaComponent},
  {path: 'mermas', component: MermasComponent},
  {path:'mermas/registrar-mermas',component:RegistrarMermasComponent},
  {path:'mermas/editar-mermas/:id_merma',component:EditarMermasComponent},
  {path: '**', component: ErrorPageComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
