export interface MateriaPrima {
  id_materia_prima:number;
  id_proveedor:number;
  nombre:string;
  unidad_medida:string;
  cantidad_minima_requerida:number;
  precio_compra:number;
  Activo:boolean;
}
