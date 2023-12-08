import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from './interfaces/producto';
import { Proveedor } from './interfaces/proveedor';
import { Compras } from './interfaces/compras';
import { MateriaPrima } from './interfaces/materia-prima';
import { User } from './interfaces/user';
import { Inventario } from './interfaces/inventario';
import { Receta } from './interfaces/receta';
import { Rol } from './interfaces/role';
import { UserRoles } from './interfaces/user-roles';
import { Subject } from 'rxjs';
import { Merma } from './interfaces/merma';
import { Venta } from './interfaces/venta';
import { Pedidos } from './interfaces/pedidos';
import { PedidosProductos } from './interfaces/pedidos-productos';

 

@Injectable({
  providedIn: 'root'
})
export class ConexionServiceService {

  constructor(private http:HttpClient) { }


  private refreshSource = new Subject<void>();
  refresh$ = this.refreshSource.asObservable();

  triggerRefresh() {
    this.refreshSource.next();
  }


  


//------------------------------- Productos ---------------------------------------------------//

  public getProductos():Observable<Producto[]>{
    return this.http.get<Producto[]>('https://localhost:7075/api/productos')
  }
  
  public getProductoPorId(id:number):Observable<Producto[]>{
    return this.http.get<Producto[]>(`https://localhost:7075/api/productos/${id}`)
  }
  
public agregarProductos(datos:Producto){
  return this.http.post('https://localhost:7075/api/productos',datos)
}

 editarProducto(id_producto:number,datos: Producto): Observable<any> {
  return this.http.put(`https://localhost:7075/api/productos/${id_producto}`, datos);
}





//------------------------------- Proveedores ---------------------------------------------------//

public getProveedores():Observable<Proveedor[]>{
  return this.http.get<Proveedor[]>('https://localhost:7075/api/proveedores')
}

public agregarProveedores(datos:Proveedor){
  return this.http.post('https://localhost:7075/api/proveedores',datos)
}

public getProveedoresId(id:number):Observable<Proveedor[]>{
  return this.http.get<Proveedor[]>(`https://localhost:7075/api/proveedores/${id}`)
}


editarProveedor(id:number,datos: Proveedor): Observable<any> {
  return this.http.put(`https://localhost:7075/api/proveedores/${id}`, datos);
}







//------------------------------- Usuarios ---------------------------------------------------//


editarRol(id:number,datos: UserRoles): Observable<any> {
  return this.http.put(`https://localhost:7075/api/user/${id}`, datos);
}

editarUsuario(id:number,datos: User): Observable<any> {
  return this.http.put(`https://localhost:7075/api/user/${id}`, datos);
}


public getUsuarios():Observable<User[]>{
  return this.http.get<User[]>('https://localhost:7075/api/user')
}

public getRoles():Observable<Rol[]>{
  return this.http.get<Rol[]>('https://localhost:7075/api/user/roles')
}

public getRolesUsuario():Observable<UserRoles[]>{
  return this.http.get<UserRoles[]>('https://localhost:7075/api/user/roles_usuario')
}

 crearUsuario(user: User):Observable<User>{
  return this.http.post<User>('https://localhost:7075/api/user', user); // Sin comillas adicionales
}

crearUsuario2(user: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post<any>(`https://localhost:7075/api/user`, user, { headers });
}


//------------------------------- Compras ---------------------------------------------------//

public getCompras():Observable<Compras[]>{
  return this.http.get<Compras[]>('https://localhost:7075/api/compras')
}


public agregarCompras(datos:Compras){
  return this.http.post('https://localhost:7075/api/compras',datos)
}



//---------------------------------Mermas---------------------------------------
public getMermas():Observable<Merma[]>{
  return this.http.get<Merma[]>('https://localhost:7075/api/Merma')
}

editarMerma(id:number,datos: Merma): Observable<any> {
  return this.http.put(`https://localhost:7075/api/Merma/${id}`, datos);
}

 agregarMerma(datos:Merma): Observable<Merma>{
  return this.http.post<Merma>('https://localhost:7075/api/Merma',datos)
}





//_______________________________________________pedidos____________
public getPedidos():Observable<Pedidos[]>{
  return this.http.get<Pedidos[]>('https://localhost:7075/api/pedidos')
}


agregarPedido(datos:Pedidos): Observable<Pedidos>{
  return this.http.post<Pedidos>('https://localhost:7075/api/pedidos',datos)
}


editarPedido(id:number,datos: Pedidos): Observable<any> {
  return this.http.put(`https://localhost:7075/api/pedidos/${id}`, datos);
}






//___________________Ventas___________________________
agregarVenta(datos:Venta): Observable<Venta>{
  return this.http.post<Venta>('https://localhost:7075/api/ventas',datos)
}

public getVentas():Observable<Venta[]>{
  return this.http.get<Venta[]>('https://localhost:7075/api/ventas')
}

//____________________pedidosProducotos___________________________________

public getPedidosProductos():Observable<PedidosProductos[]>{
  return this.http.get<PedidosProductos[]>('https://localhost:7075/api/pedidosProductos')
}

agregarPedidosProductos(datos:PedidosProductos): Observable<PedidosProductos>{
  return this.http.post<PedidosProductos>('https://localhost:7075/api/pedidosProductos',datos)
}






//------------------------------- Materia prima ---------------------------------------------------//


public getMateriaPrima():Observable<MateriaPrima[]>{
  return this.http.get<MateriaPrima[]>('https://localhost:7075/api/materias_primas')
}

public agregarMateriaPrima(datos:MateriaPrima){
  return this.http.post('https://localhost:7075/api/materias_primas',datos)
}


editarMateriaPrima(id_materia_prima:number,datos: MateriaPrima): Observable<any> {
  return this.http.put(`https://localhost:7075/api/materias_primas/${id_materia_prima}`, datos);
}


eliminarMateriaPrima(id_materia_prima:number): Observable<any> {
  return this.http.delete(`https://localhost:7075/api/materias_primas/${id_materia_prima}`);
}



//------------------------------- Inventario ---------------------------------------------------//

public getInventario():Observable<Inventario[]>{
  return this.http.get<Inventario[]>('https://localhost:7075/api/inventario')
}


editarInventario(id_inventario:number,datos: Inventario): Observable<any> {
  return this.http.put(`https://localhost:7075/api/inventario/${id_inventario}`, datos);
}


//------------------------------- Recetas ---------------------------------------------------//

public getReceta():Observable<Receta[]>{
  return this.http.get<Receta[]>('https://localhost:7075/api/receta')
}


getRecetaPorId(id_receta: number): Observable<Receta> {
  return this.http.get<Receta>(`{https://localhost:7075/api/receta}/${id_receta}`);
}

crearReceta(datos: Receta): Observable<Receta> {
  return this.http.post<Receta>('https://localhost:7075/api/receta', datos);
}

editarReceta(id_receta: number, datos: Receta): Observable<any> {
  return this.http.put(`https://localhost:7075/api/receta/${id_receta}`, datos);
}


}
