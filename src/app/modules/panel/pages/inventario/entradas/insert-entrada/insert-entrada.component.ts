import { Component } from '@angular/core';
import { InventarioService } from '../../inventario.service';
import { Router } from '@angular/router';
import { IngredienteServicesService } from '../../../ingrediente/services/ingrediente-services.service';
import Swal from 'sweetalert2';
import { Entrada } from 'src/app/interfaces/entrada';
import { Inventario } from 'src/app/interfaces/inventario';

@Component({
  selector: 'app-insert-entrada',
  templateUrl: './insert-entrada.component.html',
  styleUrls: ['./insert-entrada.component.css']
})
export class InsertEntradaComponent {
  constructor(private services:InventarioService, private router: Router, 
    private ingredientes: IngredienteServicesService){}

    dtIngrediente:any = [];
    dtIngredientesActivos : any = [];
    dtIngredienteSelect : any = [];
    
    dtInventario:any = []
    coincidencia : number = 0
    cantidad: number = 0
    idInventario:number = 0
    unidadMedida :string = '';

    regEntrada: Entrada ={
      idEntrada:0,
      idIngrediente:0,
      unidadMedida:'',
      cantidad:0,
      fechaEntrada: new Date(),
      idUsuario:1,
    }
     regInventario : Inventario = {
      idInventario:0,
      idIngrediente:0,
      unidadMedida:'',
      existenciaActual:0,
      existenciaInicial:0,
      fechaEntrada: new Date(),
      fechaModificacion: new Date(),
      idUsuario:1
     }

  ngOnInit(): void {
    this.ingredientes.showIngredients().subscribe({
      next: (response) =>{
       // this.dtIngrediente = response
       this.dtIngredientesActivos = response
       for (let index = 0; index < this.dtIngredientesActivos.length; index++) {
          if (this.dtIngredientesActivos[index].estatus) {
            this.dtIngrediente.push(this.dtIngredientesActivos[index])
          }
       }
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${err}`,
        });
      }
    });
    
  }

  ObtenerUnidadIngrediente(){
    if (this.regEntrada.idIngrediente !== 0){

      this.ingredientes.searchIngredient(this.regEntrada.idIngrediente).subscribe({
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

  AgregarEntrada(){
    if(this.regEntrada.cantidad === 0 || this.regEntrada.idIngrediente === 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }
    this.regInventario.idIngrediente = this.regEntrada.idIngrediente
    this.regInventario.existenciaInicial = this.regEntrada.cantidad
    this.regInventario.existenciaActual = this.regEntrada.cantidad
    this.regInventario.unidadMedida = this.unidadMedida

    this.regEntrada.unidadMedida = this.unidadMedida
    this.services.agregarEntrada(this.regEntrada).subscribe({
      next: () =>{

        this.services.getInventario().subscribe({
          next:(response) =>{
            this.dtInventario = response
            console.log('Todo Inventario', this.dtInventario);
            
            this.dtInventario.forEach((inventario:any) =>{  
              if( inventario.idIngrediente.toString() === this.regInventario.idIngrediente){
                  console.log('Encontrado');
                  
                  this.coincidencia = 1
                  this.cantidad = inventario.existenciaActual
                  this.idInventario = inventario.idInventario
                }
            })
            console.log('coincidencia', this.coincidencia);
            if(this.coincidencia === 1){
              this.regInventario.idInventario = this.idInventario
              console.log('existencia actual antes', this.regInventario.existenciaActual);
              
              this.regInventario.existenciaActual = (parseInt( this.regInventario.existenciaActual.toString()) + this.cantidad)
             
              console.log('existencia actual despues', this.regInventario.existenciaActual);
              
              console.log('inventario', this.regInventario);
              
              this.services.actualizarInventario(this.regInventario).subscribe({
                next: () =>{
                  Swal.fire({
                    icon: 'success',
                    title: 'Insercion',
                    text: 'Registro actualizado con Exito',
                  });
                  window.location.reload()
                },
                error: (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Insercion',
                    text: `No se pudo actualizar la cantidad en inventario: ${err}`,
                  });
                }
              })
            }
            else{
              this.services.agregarInventario(this.regInventario).subscribe({
                next: () =>{
                  Swal.fire({
                    icon: 'success',
                    title: 'Insercion',
                    text: 'Registro Registrado con Exito',
                  });
                  window.location.reload()
                },
                error: (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Insercion',
                    text: `No se pudo registrar en inventario: ${err}`,
                  });
                }
              });
            }
          }
        });
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Insercion',
          text: `No se pudo registrar la entrada a almacen: ${err}`,
        });
      }
    });
    
    this.router.navigate(['/Entradas']);
  }
}
