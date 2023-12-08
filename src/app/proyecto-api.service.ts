import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from './interfaces/login';
import { Usuario } from './interfaces/usuario';
import { Observable } from 'rxjs';
import { Cliente } from './interfaces/cliente';
import { rolUser } from './interfaces/rolUser';

@Injectable({
  providedIn: 'root'
})
export class ProyectoApiService {


  constructor(private http:HttpClient) { }


//Parte del registrar Usuario
  AgregarUsuario(datos:Usuario){
    return this.http.post('http://localhost:8080/usuarios',datos)
  }
  public getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>("http://localhost:8080/usuarios");
  }
  AgregarCliente(datos:Cliente){
    return this.http.post('http://localhost:8080/clientes',datos)
  }
  AsignarRolCliente(datos:rolUser){
    return this.http.post('http://localhost:8080/rolesusuarios',datos)
  }

  //FIN
  
}
