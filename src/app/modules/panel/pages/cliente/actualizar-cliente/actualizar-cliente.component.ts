import { Component } from '@angular/core';
import { ClienteService } from '../cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-actualizar-cliente',
  templateUrl: './actualizar-cliente.component.html',
  styleUrls: ['./actualizar-cliente.component.css']
})
export class ActualizarClienteComponent {
  constructor(
    private service: ClienteService,
    private router: Router,
    private recover: ActivatedRoute 
  ) {}

  id: number = 0;
  actCliente: any = {};
  actUsuario: any = {};
  idUser: number = 0
  

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('idCliente');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
      
    });

    

    this.service.obtenerCliente(this.id).subscribe({
      next: (response) => {
        this.actCliente = response;
        console.log('Datos Cliente', this.actCliente);
        this.idUser = this.actCliente.idUsuario;
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
          text: `Error al Obtener Registro del cliente: ${error}`,
        });
      },
    });
  }

  ActualizarCliente(){
    this.actCliente.nombres = this.actUsuario.nombre
    console.log('Datos del cliente', this.actCliente);
    
    this.service.actualizarCliente(this.actCliente).subscribe({
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
   
    this.router.navigate(['/cliente']);
  }

}
