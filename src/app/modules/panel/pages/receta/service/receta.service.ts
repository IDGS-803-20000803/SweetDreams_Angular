import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {

  constructor(public http: HttpClient) {}

  showRecipes() {
    return this.http.get('http://localhost:8080/recetas');
  }

  searchRecipe(id: number) {
    return this.http.get(`http://localhost:8080/recetas/${id}`);
  }

  insertRecipe(recipe: Receta) {
    return this.http.post('http://localhost:8080/recetas', recipe);
  }

  updateRecipe(recipe: Receta) {
    return this.http.put(
      `http://localhost:8080/recetas/${recipe.idReceta}`,
      recipe
    );
  }

  deleteRecipe(id: number) {
    return this.http.delete(`http://localhost:8080/recetas/${id}`);
  }
}
