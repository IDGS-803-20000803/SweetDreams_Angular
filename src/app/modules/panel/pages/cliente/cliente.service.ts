import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente';
import { rolUser } from 'src/app/interfaces/rolUser';
import { Usuario } from 'src/app/interfaces/usuario';
@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient){}

    public getClientes():Observable<Cliente[]>{
        return this.http.get<Cliente[]>("http://localhost:8080/clientes");
    }

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

    public obtenerCliente(id:number){
        return this.http.get(`http://localhost:8080/clientes/${id}`);
    }

    public obtenerUsuario(id:number){
        return this.http.get(`http://localhost:8080/usuarios/${id}`);
    }

    public actualizarCliente(datos:Cliente){
      return this.http.put(`http://localhost:8080/clientes/${datos.idCliente}`,
      datos)
    }
  
    public deleteCliente(id:number){
        return this.http.delete(`http://localhost:8080/clientes/${id}`);
    }
    public ActualizarUser(datos:Usuario){
      return this.http.put(`http://localhost:8080/usuarios/${datos.idUsuario}`,datos);
    }
   
}
