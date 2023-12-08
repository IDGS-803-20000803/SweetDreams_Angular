import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Empleado } from 'src/app/interfaces/empleado';
import { rolUser } from 'src/app/interfaces/rolUser';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  constructor(private http: HttpClient){}

  AsignarRolEmpleado(datos:rolUser){
    return this.http.post('http://localhost:8080/rolesusuarios',datos)
  }

  public getEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>("http://localhost:8080/empleados");
  }

  public obtenerEmpleado(id:number){
    return this.http.get(`http://localhost:8080/empleados/${id}`);
  }

AgregarUsuario(datos:Usuario){
  return this.http.post('http://localhost:8080/usuarios',datos)
}

public getUsuarios():Observable<Usuario[]>{
  return this.http.get<Usuario[]>("http://localhost:8080/usuarios");
}

public obtenerUsuario(id:number){
  return this.http.get(`http://localhost:8080/usuarios/${id}`);
}
public ActualizarUser(datos:Usuario){
  return this.http.put(`http://localhost:8080/usuarios/${datos.idUsuario}`,datos);
}

public actualizarEmpleado(datos:Empleado){
  return this.http.put(`http://localhost:8080/empleados/${datos.idEmpleado}`,
  datos)
}

AgregarEmpleado(datos:Empleado){
  return this.http.post('http://localhost:8080/empleados',datos)
}

}
