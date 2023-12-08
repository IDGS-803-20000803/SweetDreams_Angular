import { Component } from '@angular/core';
import { RecetaService } from '../service/receta.service';
import { Router } from '@angular/router';
import { Receta } from 'src/app/interfaces/receta';
import Swal, { SweetAlertOptions } from 'sweetalert2';
import { DetalleService } from '../detalle.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { DetalleReceta } from 'src/app/interfaces/detalleReceta';

@Component({
  selector: 'app-insertar-receta',
  templateUrl: './insertar-receta.component.html',
  styleUrls: ['./insertar-receta.component.css']
})
export class InsertarRecetaComponent {
  constructor(private service: RecetaService, 
               private serviceD: DetalleService,
              private serviceIngredient: IngredienteServicesService,
              private router: Router) {}

  regRecipe: Receta = {
    idReceta: 0,
    nombreReceta: '',
    tiempoDuracion: 0,
    estatus: true,
  };
   
  idReceta: number = 0;
  unidadMedida :string = '';
  ingredienteId: number = 0;
  cantidad: number = 0;
  instruccion: string = '';
  recetaId: number = 0;
  numArreglo: number = 0;
  coincidencia :number = 0;
  cantidadExtra: number = 0;
  suma:number = 0;

  dtRecetas:any = []
  dtFinalRecetas: any=[]
  //Arreglo para la tabla de los detalles
  dtDetalleTemporal : any = [];
  detalles: any = []
  dataIngredient: any = [];
  dataUnit: any = [];
  dtIngredienteSelect : any = [];
  dtIngredienteActivos: any = [];
  

 agregarDetalle(){
    if(this.ingredienteId === 0 || this.cantidad === 0 || this.instruccion === ''){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes Agregar un detalle de receta vacio',
      });
      return
    }
    
    this.detalles.idIngrediente = this.ingredienteId
    this.detalles.cantidad = this.cantidad
    this.detalles.descripcion = this.instruccion
    this.detalles.unidad = this.unidadMedida
    this.numArreglo = this.dtDetalleTemporal.length
    console.log('Longitud arreglo:' + this.numArreglo);
    
    if (this.numArreglo == 0) {
      this.dtDetalleTemporal.push(this.detalles)
      console.log('Detalle Insertado', this.dtDetalleTemporal);
    }
    else if(this.numArreglo > 0) {
      
        for (let i = 0; i < this.numArreglo; i++) {
              console.log('Id ingrediente'+ this.ingredienteId +'='+'Arreglo Id Ingrediente' + this.dtDetalleTemporal[i].idIngrediente);
              
            if(this.ingredienteId === this.dtDetalleTemporal[i].idIngrediente){
              this.coincidencia = 1; 
              this.cantidadExtra = this.dtDetalleTemporal[i].cantidad;             
            }
        }
        if (this.coincidencia == 1){
          this.suma = Number(this.cantidadExtra) + Number(this.cantidad);
          console.log('Suma'+this.suma);
          
          this.detalles.cantidad = (this.suma)

          this.eliminarDetalle(this.ingredienteId)
          this.dtDetalleTemporal.push(this.detalles)
        }
        else {
          this.dtDetalleTemporal.push(this.detalles)
        }
    }
    console.log('Detalle Temporal Final', this.dtDetalleTemporal);
    this.coincidencia = 0;
    this.cantidadExtra = 0;
    this.suma = 0;
    this.detalles = []; // Asignamos un arreglo vacío para limpiarlo
 }
  eliminarDetalle(id: number){
    const indexToRemove = this.dtDetalleTemporal.findIndex((detalle: any) => detalle.idIngrediente === id);

  if (indexToRemove !== -1) {
    this.dtDetalleTemporal.splice(indexToRemove, 1);
    console.log('Detalle eliminado:', id);
  } else {
    console.log('Detalle no encontrado para el id:', id);
  }
  }

  addRecipe() {
    if(this.regRecipe.nombreReceta === ''  || this.regRecipe.tiempoDuracion === 0){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }
    if(this.dtDetalleTemporal.length == 0){
      Swal.fire({
        icon: 'error',
        title: 'Detalle Receta',
        text: 'No puedes guardar una receta sin agregar ingredientes',
      });
      return
    }
    this.service.insertRecipe(this.regRecipe).subscribe({
      next: () => {
        console.log('Encabezado Receta Insertado');
        this.ObtenerRecetaInsertada()
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
    this.dtDetalleTemporal.forEach((detallesR : any) =>{
      console.log('Detalles', detallesR);
    this.serviceD.insertDetail({
        idDetalleReceta: 0,
        idIngrediente: detallesR.idIngrediente,
        cantidad: detallesR.cantidad,
        descripcion: detallesR.descripcion,
        idReceta: this.idReceta,
        estatus: true,
      }).subscribe({
        next: () => {
          console.log('Detalle Insertado', detallesR);
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `Es necesario llamar al administrador del sistema: ${error}`,
          });
          console.log('Detalle Error', error);
        },
      });
    })
    
  }

    ObtenerRecetaInsertada(){
      this.service.showRecipes().subscribe({
        next: (response) => {
          this.dtRecetas = response
          console.log('Recetas', this.dtRecetas);
          const ultimaPosicion = this.dtRecetas.length - 1;
          this.dtFinalRecetas = this.dtRecetas[ultimaPosicion];
          this.idReceta = this.dtFinalRecetas.idReceta;
          console.log('Posicion Arreglo', ultimaPosicion);
          console.log('idReceta', this.idReceta);
          this.addDetail()
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `Es necesario llamar al administrador del sistema: ${error}`,
          });
        },
      });
      
      Swal.fire({
        icon: 'success',
        title: 'Inserción',
        text: 'Receta Registrada con Exito',
      });
        this.router.navigate(['/recetas']);
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
  ngOnInit(): void {

   // Obtener datos de ingrediente:
   this.serviceIngredient.showIngredients().subscribe({
    next: (response) => {
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

  

  }

}
