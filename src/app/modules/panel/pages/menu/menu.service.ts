import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { Receta } from 'src/app/interfaces/receta';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private http:HttpClient) { }

  public getMenu():Observable<Menu[]>{
    return this.http.get<Menu[]>("http://localhost:8080/menus");
  }

  public getRecetas():Observable<Receta[]>{
    return this.http.get<Receta[]>("http://localhost:8080/recetas");
  }

  public agregarMenu(datos:Menu){
    return this.http.post("http://localhost:8080/menus",datos);
  }

  public obtenerMenu(id:number){
    return this.http.get("http://localhost:8080/menus/".concat(''+id));
  }

  public actualizarMenu(datos:Menu){
    return this.http.put("http://localhost:8080/menus/".concat(''+datos.idMenu) ,datos);
  }

  public deleteMenu(id:number){
    return this.http.delete("http://localhost:8080/menus/".concat(''+id));
  }

}
