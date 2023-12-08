import { Component } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario';
import { Empleado } from 'src/app/interfaces/empleado';
import { rolUser } from 'src/app/interfaces/rolUser';
import Swal from 'sweetalert2';
import { DepartamentoServicesService } from '../../departamentos/departamento-services.service';

@Component({
  selector: 'app-insert-empleado',
  templateUrl: './insert-empleado.component.html',
  styleUrls: ['./insert-empleado.component.css']
})
export class InsertEmpleadoComponent {
  constructor(public services:EmpleadoService, private router:Router, private depart: DepartamentoServicesService){}

  user:Usuario ={
    idUsuario:0,
    nombre:'',
    correo:'',
    contrasena:'',
    activo:0,
    fechaCreacion:new Date()
  }
  emple:Empleado ={
    idEmpleado: 0,
    nombres: '',
    apellidos:'',
    celular: '',
    codigoPostal: '',
    calle: '',
    colonia: '',
    estatus: true,
    idUsuario: 0
  }
  rol:rolUser = {
    idRolUsuario:0,
    idRol:3,
    idUsuario:0
  }
  coincidencia:number=0
  public dtUsuario:any =[]

  IdUsuarioCreado:number=0
  NombreUsuarioCreado:string=''
  public dtUsuarioFinal:any=[]

  dtEmpleado: any =[]
  dtRoles: any = []


  ngOnInit(): void {
    
  }



  AgregarEmpleado(){
    // Verificar si los campos están vacíos
    if (
      this.user.nombre === '' ||
      this.emple.apellidos === '' || 
      this.emple.celular === '' ||
      this.emple.codigoPostal === '' ||
      this.emple.calle === '' ||
      this.emple.colonia === '' ||
      this.user.correo === '' ||
      this.user.contrasena === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de registrar.',
      });
      return; // Detener la función si hay campos vacíos
    }

     // Aquí agregamos una función auxiliar para ejecutar el bucle después de obtener los usuarios
  const ObtenerUsuarios = () => {

    this.dtUsuario.forEach((usuario: any) => {
      if (usuario.correo === this.user.correo && usuario.activo === 0) {
        Swal.fire({
          icon: 'error',
          title: 'Ya existe este correo',
          text: 'Por favor, registra otro correo.',
        });
        this.coincidencia = 1
      }
    } 
    
    );
    if(this.coincidencia === 1){
      return
    }
    this.agregar()

  };

  this.services.getUsuarios().subscribe(
    {
      next: response => {
        this.dtUsuario = response;
        // Llamamos a la función auxiliar dentro de la suscripción para asegurarnos de que los datos estén disponibles
         ObtenerUsuarios();
         this.user = {
          idUsuario:0,
          nombre:'',
          correo:'',
          contrasena:'',
          activo:0,
          fechaCreacion:new Date()
          };

          
          this.coincidencia=0
          this.IdUsuarioCreado=0,
          this.NombreUsuarioCreado=''

          
      },
      error: error => console.log(error)
    }
  )
  
  }
  agregar() {
    console.log('Agregar este usuario:',this.user);
    
    this.services.AgregarUsuario(this.user).subscribe({

      next: (res) => {
        console.log('Despues de agregar el usuario',res);

        this.services.getUsuarios().subscribe(
          {
            next: response => {
              this.dtUsuario = response;
              this.dtUsuarioFinal = this.dtUsuario[this.dtUsuario.length -1]
              this.IdUsuarioCreado = this.dtUsuarioFinal.idUsuario
              this.NombreUsuarioCreado = this.dtUsuarioFinal.nombre
          
              
              this.AgregarEmpleadoF()
            },
            error: error => console.log(error)
          }
        )
        Swal.fire({
          icon: 'success',
          title: 'Empleado Registrado',
          text: 'Empleado Registrado con exito',
        });
      },
      error: (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          title: 'Usuario No Registrado',
          text: 'Intenta nuevamente por favor',
        });
      }
    });
  }
  AgregarEmpleadoF()
  {
    this.emple.nombres = this.NombreUsuarioCreado
    this.emple.idUsuario = this.IdUsuarioCreado

    this.rol.idUsuario = this.IdUsuarioCreado
    this.rol.idRol = 3
    console.log('Datos del empleado a insertar', this.emple);
    
    this.services.AgregarEmpleado(this.emple ).subscribe({
      next: (res) => {
        console.log('Despues de Insertar el empleado', res);
        this.AsignarRol()
        this.emple ={
          idEmpleado: 0,
          nombres: '',
          apellidos: '',
          celular: '',
          codigoPostal: '',
          calle: '',
          colonia: '',
          estatus: true,
          idUsuario: 0
         }
        window.location.reload()
      },
      error: error => console.log(error)
    });
    
    this.router.navigate(['/empleados']);
  }
  AsignarRol(){

    console.log('Datos del rol antes de insertar',this.rol);
    
    this.services.AsignarRolEmpleado(this.rol).subscribe({
      next: (res) => {
        console.log('Despues de asignar el rol', this.rol);
        
      },
      error: error => console.log(error)
    })
  }
}
