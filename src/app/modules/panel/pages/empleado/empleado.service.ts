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
    return this.http.post('http://192.168.100.51:7220/api/RolesUsers',datos)
  }

  public getEmpleados():Observable<Empleado[]>{
    return this.http.get<Empleado[]>("http://192.168.100.51:7220/api/Empleadoes");
  }

  public obtenerEmpleado(id:number){
    return this.http.get(`http://192.168.100.51:7220/api/Empleadoes/${id}`);
  }

AgregarUsuario(datos:Usuario){
  return this.http.post('http://192.168.100.51:7220/api/Usuarios',datos)
}

public getUsuarios():Observable<Usuario[]>{
  return this.http.get<Usuario[]>("http://192.168.100.51:7220/api/Usuarios");
}

public obtenerUsuario(id:number){
  return this.http.get(`http://192.168.100.51:7220/api/Usuarios/${id}`);
}
public ActualizarUser(datos:Usuario){
  return this.http.put(`http://192.168.100.51:7220/api/Usuarios/${datos.id}`,datos);
}

public actualizarEmpleado(datos:Empleado){
  return this.http.put(`http://192.168.100.51:7220/api/Empleadoes/${datos.id}`,
  datos)
}

AgregarEmpleado(datos:Empleado){
  return this.http.post('http://192.168.100.51:7220/api/Empleadoes',datos)
}

}
