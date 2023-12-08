import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {

  constructor(public http: HttpClient) { }

  showDetail() {
    return this.http.get('http://localhost:8080/detalleRecetas');
  }

  searchDetail(id: number) {
    return this.http.get(`http://localhost:8080/detalleRecetas/${id}`);
  }

  insertDetail(detail: DetalleReceta) {
    return this.http.post('http://localhost:8080/detalleRecetas', detail);
  }

  updateDetail(detail: DetalleReceta) {
    return this.http.put(
      `http://localhost:8080/detalleRecetas/${detail.idDetalleReceta}`,detail
    );
  }

  deleteDetail(id: number) {
    return this.http.delete(`http://localhost:8080/detalleRecetas/${id}`);
  }
}
