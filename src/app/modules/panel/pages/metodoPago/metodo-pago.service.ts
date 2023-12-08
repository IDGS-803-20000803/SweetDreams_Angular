import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MetodoPago } from 'src/app/interfaces/metodoPago';

@Injectable({
  providedIn: 'root'
})
export class MetodoPagoService {

  constructor(private http: HttpClient) { }

  public getMetodoPago(): Observable<MetodoPago[]> {
    return this.http.get<MetodoPago[]>("http://localhost:8080/metodopagos");
  }

  public obtenerMetodoPago(id: number) {
    return this.http.get("http://localhost:8080/metodopagos/".concat('' + id));
  }
}
