export interface Pedidos {
  idPedido: number,
  idCliente: number,
  idMetodoPago: number,
  estatus: string,
  fechaCreacion: Date,
  fechaModificacion: Date,
  total: number
  }