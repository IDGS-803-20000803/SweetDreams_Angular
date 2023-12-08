export interface Inventario {
    idInventario: number,
    existenciaInicial: number,
    existenciaActual: number,
    unidadMedida: string,
    fechaEntrada: Date,
    fechaModificacion: Date,
    idIngrediente: number,
    idUsuario: number
  }