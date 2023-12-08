import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IngredienteServicesService } from './services/ingrediente-services.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';



@Component({
  selector: 'app-ingrediente',
  templateUrl: './ingrediente.component.html',
  styleUrls: ['./ingrediente.component.css']
})
export class IngredienteComponent {
  constructor(public service: IngredienteServicesService, private router: Router) {}
  
  dataSource: any = [];
  dtIngredientes: any = [];

  ngOnInit(): void {
    this.service.showIngredients().subscribe({
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
    });
  }

  openInsertWindow() {
    this.router.navigate(['/insertIngredientes']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/editIngredientes/${data.idIngrediente}`]);
  }

  dropIngredient(id: number) {
    Swal.fire({
      title: "¿Estas Seguro de eliminar el ingrediente?",
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
          text: "El ingrediente ha sido borrado.",
          icon: "success"
        });
        this.service.searchIngredient(id).subscribe({
          next: (response) => {
            this.dtIngredientes = response;
            this.dtIngredientes.estatus = false;
            this.service.updateIngredient(this.dtIngredientes).subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Eliminación',
                  text: 'Registro Eliminado con Exito',
                });
                window.location.reload();
              },
              error: (error) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de Server',
                  text: `Es necesario llamar al administrador del sistema: ${error}`,
                });
              },
            });
          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Es necesario contactar al administrador del sistema: ${error}`,
            });
          },
        });

        
      }
    });
    
  }
  
}
