export interface DetalleCompra {
  idCompraDetalle: number,
  idCompra: number,
  idIngrediente: number,
  unidadMedida: string,
  cantidad: number,
  precioUnitario: number,
  total: number,
  estatus: string
  
}