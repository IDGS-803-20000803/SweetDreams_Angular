import { Component } from '@angular/core';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {
  constructor(public service: ClienteService, private router: Router) {}

  dataSource: any = [];

  dtCliente :any = {}
  dtusuario : any = {}
  idUser: number = 0

  ngOnInit(): void {
    this.service.getClientes().subscribe({
      next: (response) => {
        this.dataSource = response;
      
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Ocurrio un error en el servidor : ${error}`,
        });
      },
    })
  }

  openInsertWindow() {
    this.router.navigate(['/Insertarcliente']);
  }

  openEditWindow(data: any) {
    console.log("primera vista: "+data.idCliente);
    this.router.navigate([`/ActualizarCliente/${data.idCliente}`]);
  }
 

  dropCliente(id: number) {
    Swal.fire({
      title: "¿Estas Seguro de eliminar el cliente?",
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
          text: "El cliente ha sido borrado.",
          icon: "success"
        });
        this.service.obtenerCliente(id).subscribe({
          next: (response) => {
            this.dtCliente = response;
            console.log('Datos Cliente', this.dtCliente);
            this.idUser = this.dtCliente.idUsuario;
            console.log('Id Usuario:', this.idUser);
            
            this.dtCliente.estatus = false
            this.service.actualizarCliente(this.dtCliente).subscribe({
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
                  text: `Error al eliminar el cliente: ${error}`,
                });
              },
            });
    
           
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error al Obtener Registro del cliente: ${error}`,
            });
          },
        });
    
      }
    });
    

  }
}
