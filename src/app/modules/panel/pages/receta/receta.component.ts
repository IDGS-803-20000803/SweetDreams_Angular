import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from './service/receta.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DetalleService } from './detalle.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent {
  constructor(public service: RecetaService, public serviceD: DetalleService, private router: Router) {}

  dataSource: any = [];
  idReceta:number = 0;
  dtRecetas: any = [];
  dtRecetaEditar :any = [];
  dtRecetaEliminar :any = [];

  ngOnInit(): void {
    this.service.showRecipes().subscribe({
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
    this.router.navigate(['/insertReceta']);
  }

  openEditWindow(data: any) {
    this.router.navigate([`/editReceta/${data.idReceta}`]);
  }

  detalles(){
  this.serviceD.showDetail().subscribe({
    next: (response) => {
      //this.dtRecetas = response;
      this.dtRecetaEliminar = response;

      for (let index = 0; index < this.dtRecetaEliminar.length; index++) {

          if (this.dtRecetaEliminar[index].estatus) {
            if (this.dtRecetaEliminar[index].idReceta == this.idReceta) {
              this.dtRecetas.push(this.dtRecetaEliminar[index]);
            }
          }
        
      }

      if (this.dtRecetas.length > 0) {
        for (let i = 0; i < this.dtRecetas.length; i++) {
        this.dtRecetas[i].estatus = false;
        this.serviceD.updateDetail(this.dtRecetas[i]).subscribe({
          next: () => {

          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Es necesario llamar al administrador del sistema: ${error}`,
            });
          }
        });
        
        }
      }
      window.location.reload()
      //this.filterData();
      //this.dropDetail();
      
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: `Es necesario llamar al administrador del sistema: ${error}`,
      });
    },
  });}

  dropRecipe(id: number) {
    Swal.fire({
      title: "¿Estas Seguro de eliminar la Receta?",
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
          text: "La Receta ha sido borrada.",
          icon: "success"
        });
        this.idReceta = id
    this.service.searchRecipe(this.idReceta).subscribe({
      next: (response) => {
        this.dtRecetaEditar = response
        this.dtRecetaEditar.estatus = false;
        this.service.updateRecipe(this.dtRecetaEditar).subscribe({
          next: () => {
            this.detalles()

          },
          error: (error) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Es necesario llamar al administrador del sistema: ${error}`,
            });
          }
        });
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      }
    });
    
      }
    });
    
   
  }

  openDetailWindow(data: any) {
    this.router.navigate([`/detalle/${data.idReceta}`]);
  }
}
