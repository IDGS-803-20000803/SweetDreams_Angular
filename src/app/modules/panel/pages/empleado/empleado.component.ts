import { Component } from '@angular/core';
import { EmpleadoService } from './empleado.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent {
  constructor(public service: EmpleadoService, private router: Router) {}

  dataSource: any = [];

  dtEmpleado :any = {}
  dtusuario : any = {}
  idUser: number = 0

  ngOnInit(): void {
    this.service.getEmpleados().subscribe({
      next: (response) => {
        this.dataSource = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `NO HAY DATOS EN LA BD: ${error}`,
        });
      },
    })
  }

  openInsertWindow() {
    this.router.navigate(['/InsertarEmpleado']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/ActualizarEmpleado/${data.id}`]);
  }

  dropEmpleado(id: number) {
    this.service.obtenerEmpleado(id).subscribe({
      next: (response) => {
        this.dtEmpleado = response;
        console.log('Datos Empleado', this.dtEmpleado);
        this.idUser = this.dtEmpleado.userId
        console.log('Id Usuario:', this.idUser);
        
        this.dtEmpleado.baja = 1
        this.service.actualizarEmpleado(this.dtEmpleado).subscribe({
          next:() => {
              this.service.obtenerUsuario(this.idUser).subscribe({
                next: (response) =>{
                  this.dtusuario = response
                  this.dtusuario.active = 1
                  this.service.ActualizarUser(this.dtusuario).subscribe({
                      next:() =>{
                          window.location.reload()
                      },
                      error: (error) => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error de Server',
                          text: `Error al eliminar usuario: ${error}`,
                        });
                      },
                  });
                },
                error: (error) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Error de Server',
                    text: `Error al obtener informacion del usuario: ${error}`,
                  });
                },
              });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error al eliminar el empleado: ${error}`,
            });
          },
        });

       
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al Obtener Registro del empleado: ${error}`,
        });
      },
    });


  }
 
}
