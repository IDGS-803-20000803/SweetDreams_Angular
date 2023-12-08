export interface Compra {
    idCompra: number,
    idProveedor: number,
    idMetodoPago: number,
    totalCompra: number,
    estatus: number,
    fechaCreacion: Date,
    idUsuario: number,
  }