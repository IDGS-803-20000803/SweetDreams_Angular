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
    id:0,
    name:'',
    email:'',
    password:'',
    active:0,
    confirmed_at:new Date()
  }
  emple:Empleado ={
    id: 0,
    nombres: '',
    apePaterno: '',
    apeMaterno: '',
    fotoEmpleado: '',
    rfc: '',
    curp: '',
    numSeguroSocial: '',
    celular: '',
    alergias: '',
    observaciones: '',
    codigoPostal: '',
    calle: '',
    colonia: '',
    baja: 0,
    fechaCreacion: new Date(),
    fechaModificacion: new Date(),
    usuarioModificacion: 0,
    departamentoId: 0,
    userId: 0
  }
  rol:rolUser = {
    id:0,
    roleId:3,
    userId:0
  }
  coincidencia:number=0
  public dtUsuario:any =[]

  IdUsuarioCreado:number=0
  NombreUsuarioCreado:string=''
  public dtUsuarioFinal:any=[]

  dtEmpleado: any =[]
  dtRoles: any = []
  dataDepart: any = [];

  ngOnInit(): void {
     
    this.depart.showDepartments().subscribe({
      next: (response) => {
        this.dataDepart = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `ERROR AL ELIMINAR EL REGISTRO DE LA BD: ${error}`,
        });
      },
    });

    const inputFile = document.getElementById('inputFile') as HTMLInputElement;

    if (inputFile) {
      inputFile.addEventListener('change', async (event) => {
        const selectedFile = (event.target as HTMLInputElement).files?.[0]; // Usamos el operador de opción nula (?.) para acceder a la propiedad
        if (selectedFile) {
          try {
            const base64Image = this.imageToBase64(selectedFile);

            this.emple.fotoEmpleado = await base64Image.then((data) => 'data:image/jpeg;base64,' + data);

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error de conversion de imagen: ${error}`,
            });
          }
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: 'No se encontró el elemento inputFile.',
      });
      
    }
  }

  imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Data = reader.result.split(',')[1]; // Eliminamos "data:image/jpeg;base64,"
          resolve(base64Data);
        } else {
          reject(new Error('Error al leer el archivo.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al cargar el archivo.'));
      };

      reader.readAsDataURL(file);
    });
  }

  AgregarEmpleado(){
    // Verificar si los campos están vacíos
    if (
      this.user.name === '' ||
      this.emple.apeMaterno === '' || 
      this.emple.celular === '' ||
      this.emple.codigoPostal === '' ||
      this.emple.calle === '' ||
      this.emple.colonia === '' ||
      this.user.email === '' ||
      this.user.password === ''
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
      if (usuario.email === this.user.email && usuario.active === 0) {
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
          id:0,
          name:'',
          email:'',
          password:'',
          active:0,
          confirmed_at:new Date()
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
              this.IdUsuarioCreado = this.dtUsuarioFinal.id
              this.NombreUsuarioCreado = this.dtUsuarioFinal.name
          
              
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
    this.emple.userId = this.IdUsuarioCreado

    this.rol.userId = this.IdUsuarioCreado
    this.rol.roleId = 3
    console.log('Datos del empleado a insertar', this.emple);
    
    this.services.AgregarEmpleado(this.emple ).subscribe({
      next: (res) => {
        console.log('Despues de Insertar el empleado', res);
        this.AsignarRol()
        this.emple ={
          id: 0,
          nombres: '',
          apePaterno: '',
          apeMaterno: '',
          fotoEmpleado: '',
          rfc: '',
          curp: '',
          numSeguroSocial: '',
          celular: '',
          alergias: '',
          observaciones: '',
          codigoPostal: '',
          calle: '',
          colonia: '',
          baja: 0,
          fechaCreacion: new Date(),
          fechaModificacion: new Date(),
          usuarioModificacion: 0,
          departamentoId: 0,
          userId: 0
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
