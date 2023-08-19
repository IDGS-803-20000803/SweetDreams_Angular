import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnidadesMedida } from 'src/app/interfaces/unidades-media';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  constructor(public http: HttpClient) {}

  showUnits() {
    return this.http.get('http://192.168.100.51:7220/api/UnidadMedidums');
  }

  searchUnit(id: number) {
    return this.http.get(`http://192.168.100.51:7220/api/UnidadMedidums/${id}`);
  }

  insertUnit(unit: UnidadesMedida) {
    return this.http.post('http://192.168.100.51:7220/api/UnidadMedidums', unit);
  }

  updateUnit(unit: UnidadesMedida) {
    return this.http.put(
      `http://192.168.100.51:7220/api/UnidadMedidums/${unit.id}`,
      unit
    );
  }

  deleteUnit(id: number) {
    return this.http.delete(`http://192.168.100.51:7220/api/UnidadMedidums/${id}`);
  }
}
