import { Component } from '@angular/core';
import { DetalleService } from '../detalle.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { RecetaService } from '../service/receta.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-detalle-receta',
  templateUrl: './detalle-receta.component.html',
  styleUrls: ['./detalle-receta.component.css']
})
export class DetalleRecetaComponent {
  constructor(
    public service: DetalleService,
    public serviceIngredient: IngredienteServicesService,
    public serviceReceta: RecetaService,
    private router: Router,
    private recover: ActivatedRoute
  ) { }

  id: number = 0;
  dataSource: any = [];
  dataIngredient: any = [];
  dataReceta: any = [];
  dtRecetaActivos: any = [];
  dtDetalleReceta: any = [];


  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('idReceta');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    // Obtener datos de detalle:
    this.service.showDetail().subscribe({
      next: (response) => {
        //this.dataSource = response;
        this.dtRecetaActivos = response
        for (let index = 0; index < this.dtRecetaActivos.length; index++) {
            if (this.dtRecetaActivos[index].estatus) {
              this.dataSource.push(this.dtRecetaActivos[index]);
            }
          
        }
        this.filterData();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      },
    });

    // Obtener datos de ingrediente:
    this.serviceIngredient.showIngredients().subscribe({
      next: (response) => {
        this.dataIngredient = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      },
    });

  

    // Obtener datos de receta:
    this.serviceReceta.showRecipes().subscribe({
      next: (response) => {
        this.dataReceta = response;
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



  dropDetail(id: number) {
    Swal.fire({
      title: "¿Estas Seguro de eliminar el detalle receta?",
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
          text: "El detalle receta ha sido borrado.",
          icon: "success"
        });
       
        this.service.searchDetail(id).subscribe({
          next: (response) => {
            this.dtDetalleReceta = response;
            this.dtDetalleReceta.estatus = false;
            this.service.updateDetail(this.dtDetalleReceta).subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Eliminacion',
                  text: 'Detalle Receta Eliminado con Exito',
                });
                window.location.reload();
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

  private filterData(): void {
    this.dataSource = this.dataSource.filter(
      (item: any) => item.idReceta === this.id
    );
  }
}
