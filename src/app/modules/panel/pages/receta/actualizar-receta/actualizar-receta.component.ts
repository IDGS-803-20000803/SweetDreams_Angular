import { Component } from '@angular/core';
import { Receta } from 'src/app/interfaces/receta';
import { RecetaService } from '../service/receta.service';
import { DetalleService } from '../detalle.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-actualizar-receta',
  templateUrl: './actualizar-receta.component.html',
  styleUrls: ['./actualizar-receta.component.css']
})
export class ActualizarRecetaComponent {

  constructor(private service: RecetaService, 
    private serviceD: DetalleService,
    private serviceReceta: RecetaService,
   private serviceIngredient: IngredienteServicesService,
   private router: Router, private recover: ActivatedRoute ) {}

  id: number = 0;
  actReceta: any = {};
  dataIngredient: any = [];
  dtReceta: any = [];
  dtRecetaActivos: any = []; 
  dtIngredienteSelect : any = [];
  dtIngredienteActivos: any = [];
  ingredienteId: number = 0;
  cantidad: number = 0;
  instruccion: string = '';
  unidadMedida: string = '';

  coincidencia: number = 0;
  cantidadDuplicada: number = 0;
  dtDetalleRecetaDuplicado: any = [];
  dtDetalleEliminar : any = [];

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('idReceta');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });


     // Obtener datos de ingrediente:
   this.serviceIngredient.showIngredients().subscribe({
    next: (response) => {
      //this.dataIngredient = response;
      this.dtIngredienteActivos = response
      for (let index = 0; index < this.dtIngredienteActivos.length; index++) {
        
        if(this.dtIngredienteActivos[index].estatus ) {
          this.dataIngredient.push(this.dtIngredienteActivos[index]);
        }
        
      }
      
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
   this.serviceReceta.searchRecipe(this.id).subscribe({
    next: (response) => {
      this.actReceta = response;
      console.log('Encabezado Receta', this.actReceta);
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: `Es necesario llamar al administrador del sistema: ${error}`,
      });
    },
  });

  // Obtener datos de detalle:
  this.serviceD.showDetail().subscribe({
    next: (response) => {
      //this.dtReceta = response;
      this.dtRecetaActivos = response
      for (let index = 0; index < this.dtRecetaActivos.length; index++) {
        
        if(this.dtRecetaActivos[index].estatus ) {
          this.dtReceta.push(this.dtRecetaActivos[index]);
        }
        
      }
      
      this.filterData();
      console.log('Detalles Receta', this.dtReceta);
      
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
  
   ObtenerUnidadIngrediente(){
      if (this.ingredienteId !== 0){

        this.serviceIngredient.searchIngredient(this.ingredienteId).subscribe({
          next: (response) => {
            this.dtIngredienteSelect = response;
            this.unidadMedida = this.dtIngredienteSelect.unidadMedida;
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
    }

  private filterData(): void {
    this.dtReceta = this.dtReceta.filter(
      (item: any) => item.idReceta === this.id
    );
  }

  editRecipe() {
    this.service.updateRecipe(this.actReceta).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion',
          text: 'Receta Actualizada con Exito',
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
    this.router.navigate(['/recetas']);
  }

  dropDetail(id: number) { 
    this.serviceD.searchDetail(id).subscribe({
      next: (response) => {
        this.dtDetalleEliminar = response
        this.dtDetalleEliminar.estatus = false;
        this.serviceD.updateDetail(this.dtDetalleEliminar).subscribe({
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
      },
    });
  }

  addDetail() {
    if(this.ingredienteId === 0 || this.cantidad === 0 || this.instruccion === ''){

      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }
    // Obtener datos de detalle:
  this.serviceD.showDetail().subscribe({
    next: (response) => {
      //this.dtReceta = response;
      this.dtRecetaActivos = response
      for (let index = 0; index < this.dtRecetaActivos.length; index++) {
        
        if(this.dtRecetaActivos[index].estatus ) {
          this.dtReceta.push(this.dtRecetaActivos[index]);
        }
        
      }
      this.filterData();
      this.dtRecetaActivos = [];
      
    },
    error: (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: `Es necesario llamar al administrador del sistema: ${error}`,
      });
    },
  });

    console.log('Arreglo de dtReceta: '+ this.dtReceta.length);
    
    if (this.dtReceta.length == 0) {
      this.serviceD.insertDetail({
        idDetalleReceta: 0,
        idIngrediente: this.ingredienteId,
        cantidad: this.cantidad,
        descripcion: this.instruccion,
        idReceta: this.id,
        estatus: true,
      }).subscribe({
        next: () => {
          Swal.fire({
            icon: 'success',
            title: 'Insercion',
            text: 'Detalle Receta Registrada con Exito',
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
    }
    else{
      for (let index = 0; index < this.dtReceta.length; index++) {
      
        if(this.dtReceta[index].idIngrediente == this.ingredienteId){
          this.coincidencia = 1
         this.dtDetalleRecetaDuplicado = this.dtReceta[index]
        }
      }

      if(this.coincidencia == 1){
        this.dtDetalleRecetaDuplicado.cantidad = (Number(this.dtDetalleRecetaDuplicado.cantidad) + Number(this.cantidad))
        this.serviceD.updateDetail(this.dtDetalleRecetaDuplicado).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Insercion',
              text: 'Detalle Receta Actualizada con Exito',
            });
            this.coincidencia = 0;
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
      }
      else{
      this.serviceD.insertDetail({
          idDetalleReceta: 0,
          idIngrediente: this.ingredienteId,
          cantidad: this.cantidad,
          descripcion: this.instruccion,
          idReceta: this.id,
          estatus: true,
        }).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Insercion',
              text: 'Detalle Receta Registrada con Exito',
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
      }
    }
   
  }

}
