import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { rolUser } from 'src/app/interfaces/rolUser';
import { Usuario } from 'src/app/interfaces/usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthServicesService {

  constructor(private http:HttpClient) { }

  public getUsuarios():Observable<Usuario[]>{
    return this.http.get<Usuario[]>("http://localhost:8080/usuarios");
  }
  public getRolUser():Observable<rolUser[]>{
    return this.http.get<rolUser[]>("http://localhost:8080/rolesusuarios");
  }
}
