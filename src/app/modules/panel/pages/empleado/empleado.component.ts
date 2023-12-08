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
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      },
    })
  }

  openInsertWindow() {
    this.router.navigate(['/InsertarEmpleado']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/ActualizarEmpleado/${data.idEmpleado}`]);
  }

  dropEmpleado(id: number) {
    Swal.fire({
      title: "¿Estas Seguro de eliminar el empleado?",
      text: "Esta Accion no puede revertirse",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Borrarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Borrado!",
          text: "El empleado ha sido borrado.",
          icon: "success"
        });
        this.service.obtenerEmpleado(id).subscribe({
          next: (response) => {
            this.dtEmpleado = response;
            console.log('Datos Empleado', this.dtEmpleado);
            this.idUser = this.dtEmpleado.idUsuario
            console.log('Id Usuario:', this.idUser);
            
            this.dtEmpleado.estatus = false
            this.service.actualizarEmpleado(this.dtEmpleado).subscribe({
              next:() => {
                  this.service.obtenerUsuario(this.idUser).subscribe({
                    next: (response) =>{
                      this.dtusuario = response
                      this.dtusuario.activo = 1
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
    });
   


  }
 
}
