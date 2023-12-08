import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredientes } from 'src/app/interfaces/ingredientes';

@Injectable({
  providedIn: 'root'
})
export class IngredienteServicesService {

  constructor(public http: HttpClient) {}

  showIngredients() {
    return this.http.get('http://localhost:8080/ingredientes');
  }

  searchIngredient(id: number) {
    return this.http.get(`http://localhost:8080/ingredientes/${id}`);
  }

  insertIngredient(ingredient: Ingredientes) {
    return this.http.post(
      'http://localhost:8080/ingredientes',
      ingredient
    );
  }

  updateIngredient(ingredient: Ingredientes) {
    return this.http.put(
      `http://localhost:8080/ingredientes/${ingredient.idIngrediente}`,
      ingredient
    );
  }

  deleteIngredient(id: number) {
    return this.http.delete(`http://10.16.14.95:7220/api/Ingredientes/${id}`);
  }

  buscarUnidadMedida(id:number){
    return this.http.get(`http://10.16.14.95:7220/api/UnidadMedidums/${id}`);
 
  }


}
