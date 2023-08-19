import { Component } from '@angular/core';
import { EmpleadoService } from '../empleado.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DepartamentoServicesService } from '../../departamentos/departamento-services.service';

@Component({
  selector: 'app-actualizar-empleado',
  templateUrl: './actualizar-empleado.component.html',
  styleUrls: ['./actualizar-empleado.component.css']
})
export class ActualizarEmpleadoComponent {
  constructor(
    private service: EmpleadoService,  private depart: DepartamentoServicesService,
    private router: Router,
    private recover: ActivatedRoute 
  ) {}

  id: number = 0;
  emple: any = {};
  actUsuario: any = {};
  idUser: number = 0
  dataDepart: any = [];

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('id');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

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

    this.service.obtenerEmpleado(this.id).subscribe({
      next: (response) => {
        this.emple = response;
        console.log('Datos Cliente', this.emple);
        this.idUser = this.emple.userId
        console.log('Id Usuario:', this.idUser);

        this.service.obtenerUsuario(this.idUser).subscribe({
          next: (response) => {
            this.actUsuario = response;
            console.log('Datos Usuario', this.actUsuario);
            
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error al Obtener Registro del usuario: ${error}`,
            });
          },
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al Obtener Registro del Empleado: ${error}`,
        });
      },
    });
  }

  ActualizarEmpleado(){
    this.emple.nombres = this.actUsuario.name
    console.log('Datos del cliente', this.emple);
    
    this.service.actualizarEmpleado(this.emple).subscribe({
      next: () => {
        this.service.ActualizarUser(this.actUsuario).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Actualizacion',
              text: 'Registro Actualizado con Exito',
            });
            window.location.reload();
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error al Actualizar el Registro: ${error}`,
            });
          },
        });
       
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al Actualizar el Registro: ${error}`,
        });
      },
    });
   
    this.router.navigate(['/empleados']);
  }

}
