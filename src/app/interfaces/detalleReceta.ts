export interface DetalleReceta {
    idDetalleReceta: number;
    idIngrediente: number;
    cantidad: number;
    descripcion: string;
    idReceta: number;
    estatus: boolean;
  }