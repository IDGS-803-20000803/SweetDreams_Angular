import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from 'src/app/interfaces/compras';
import { DetalleCompra } from 'src/app/interfaces/detalleCompra';
import { Pedidos } from 'src/app/interfaces/pedidos';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  constructor(private http: HttpClient) { }

  public getPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>("http://localhost:8080/pedidos");
  }

  public getCompra(): Observable<Compra[]> {
    return this.http.get<Compra[]>("http://localhost:8080/compras");
  }

  public agregarCompra(datos: Compra) {
    return this.http.post("http://localhost:8080/compras", datos);
  }

  public actualizarCompra(datos: Compra) {
    return this.http.put(`http://localhost:8080/compras/${datos.idCompra}`, datos);
  }

  public obtenerCompra(id: number): Observable<Compra> {
    return this.http.get<Compra>("http://localhost:8080/compras/".concat('' + id));
  }

  public deleteCompra(id: number) {
    return this.http.delete("http://localhost:8080/compras/".concat('' + id));
  }

  // --------------------- DETALLE COMPRA ---------------------


  // Obtener todos los detalles de las compras
  public getDetallesCompras(): Observable<DetalleCompra[]> {
    return this.http.get<DetalleCompra[]>("http://localhost:8080/compradetalles");
  }

  // Guardar un detalle de compra
  public detalleCompra(datos: DetalleCompra) {
    return this.http.post("http://localhost:8080/compradetalles", datos);
  }

  public actualizarDetalleCompra(datos: DetalleCompra) {
    return this.http.put(`http://localhost:8080/compradetalles/${datos.idCompraDetalle}`, datos);
  }

  public deleteDetalleCompra(id: number) {
    return this.http.delete("http://localhost:8080/compradetalles/".concat('' + id));
  }
}
