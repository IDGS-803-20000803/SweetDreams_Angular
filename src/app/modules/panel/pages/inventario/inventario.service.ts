import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from 'src/app/interfaces/entrada';
import { Inventario } from 'src/app/interfaces/inventario';
import { Salida } from 'src/app/interfaces/salida';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  constructor(private http:HttpClient) { }

  public getSalidas():Observable<Salida[]>{
    return this.http.get<Salida[]>("http://localhost:8080/salidainventarios");
  }
  public getEntradas():Observable<Entrada[]>{
    return this.http.get<Entrada[]>("http://localhost:8080/entradainventarios");
  }
 
  public agregarEntrada(datos:Entrada){
    return this.http.post("http://localhost:8080/entradainventarios",datos);
  }

  public agregarSalida(datos:Salida){
    return this.http.post("http://localhost:8080/salidainventarios",datos);
  }

  public agregarInventario(datos:Inventario){
    return this.http.post("http://localhost:8080/inventarios",datos);
  }

  public getInventario():Observable<Inventario[]>{
    return this.http.get<Inventario[]>("http://localhost:8080/inventarios");
  }

  public actualizarInventario(datos:Inventario){
    return this.http.put("http://localhost:8080/inventarios/".concat(''+datos.idInventario) ,datos);
  }

  public obtenerInventario(id:number){
    return this.http.get("http://localhost:8080/inventarios/".concat(''+id));
  }
  

}
