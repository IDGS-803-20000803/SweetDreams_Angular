import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import {CookieService} from 'ngx-cookie-service';
import { AuthServicesService } from '../../services/auth-services.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.css'],
  providers: [CookieService]
})
export class AuthPageComponent {

  public dtUsuario:any =[]
  public dtRolUser:any=[]

  coincidencia: number= 0
  tipoRol: number=0

  user:Login = {
    username:'',
    password:'',
    role:''
  }

  constructor(private login:AuthServicesService, private cookie: CookieService, private router:Router){}
 verificarUsuario(){
    console.log('Datos Ingresados:', this.user);
    
    this.login.getUsuarios().subscribe(
      {
        next: response => {
          this.dtUsuario = response;
          console.log('Datos DB:', this.dtUsuario);
          this.dtUsuario.forEach((usuario: any) => {
          
            if (usuario.nombre === this.user.username && usuario.contrasena === this.user.password && usuario.activo === 0) {
              Swal.fire({
                icon: 'success',
                title: 'Bienvenido a Sweet Dreams',
                text: 'Usuario y Contraseña Correctos',
              });
              this.coincidencia = 1
              this.tipoRol = usuario.idUsuario
            }
          });
          console.log('Existe el usuario', this.coincidencia);
          
          if(this.coincidencia === 0){
            Swal.fire({
              icon: 'error',
              title: 'Usuario o Contraseña Inconrrectos',
              text: 'Por favor vuelva a intentarlo.',
            });
            
            return;
          }
          else{
            this.login.getRolUser().subscribe({
              next: response => {
                this.dtRolUser = response
                this.dtRolUser.forEach((usuario: any) => {
          
                  if (usuario.idUsuario === this.tipoRol) {
     
                      if(usuario.idRol === 2){//Cliente
                       this.cookie.set('token','password',1,'/')
                       this.router.navigate(['/','panel']) 
                      }
                      if(usuario.idRol === 3 || usuario.idRol === 1){//Empleado y ADMIN
                        this.cookie.set('token','password',1,'/')
                        this.router.navigate(['/','panel']) 
                      }
                  }
                });
              },
              error: error => console.log(error)
            })}
          
        },
        error: error => console.log(error)
      }

    )
            
 }
}
