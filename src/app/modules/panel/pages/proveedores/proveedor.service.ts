import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Proveedor } from 'src/app/interfaces/proveedor';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  constructor(private http:HttpClient) { }

  public getProveedores():Observable<Proveedor[]>{
    return this.http.get<Proveedor[]>("http://localhost:8080/proveedores");
  }

  public agregarProveedor(datos:Proveedor){
    return this.http.post("http://localhost:8080/proveedores",datos);
  }

  public obtenerProveedor(id:number){
    return this.http.get("http://localhost:8080/proveedores/".concat(''+id));
  }

  public actualizarProveedor(datos:Proveedor){
    return this.http.put("http://localhost:8080/proveedores/".concat(''+datos.idProveedor) ,datos);
  }

  public deleteProveedor(id:number){
    return this.http.delete("http://localhost:8080/proveedores/".concat(''+id));
  }
}
