import { Component } from '@angular/core';
import { InventarioService } from '../../inventario.service';
import { Router } from '@angular/router';
import { IngredienteServicesService } from '../../../ingrediente/services/ingrediente-services.service';
import { Salida } from 'src/app/interfaces/salida';
import Swal from 'sweetalert2';
import { Inventario } from 'src/app/interfaces/inventario';

@Component({
  selector: 'app-insert-salidas',
  templateUrl: './insert-salidas.component.html',
  styleUrls: ['./insert-salidas.component.css']
})
export class InsertSalidasComponent {

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

    regSalida: Salida ={
      idSalida:0,
      idIngrediente:0,
      unidadMedida:'',
      cantidad:0,
      fechaSalida: new Date(),
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
      if (this.regSalida.idIngrediente !== 0){
  
        this.ingredientes.searchIngredient(this.regSalida.idIngrediente).subscribe({
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

    AgregarSalida(){
      this.regSalida.unidadMedida = this.unidadMedida 
      if(this.regSalida.cantidad === 0 || this.regSalida.idIngrediente === 0){
        Swal.fire({
          icon: 'error',
          title: 'Campos Vacios',
          text: 'No puedes guardar campos vacios',
        });
        return
      }
      this.regInventario.idIngrediente = this.regSalida.idIngrediente
      
      this.services.getInventario().subscribe({
        next:(response) =>{
          this.dtInventario = response

          this.dtInventario.forEach((inventario:any) =>{
           
            
            if( inventario.idIngrediente.toString() === this.regInventario.idIngrediente){
                console.log('Encontrado');
                
                this.coincidencia = 1
                this.cantidad = inventario.existenciaActual
                this.idInventario = inventario.idInventario
                this.regInventario.existenciaInicial = inventario.existenciaInicial
                this.regInventario.existenciaActual = inventario.existenciaActual

                console.log('Cantidad Actual', this.cantidad);
                console.log('Id Inventario', this.idInventario);
                console.log('Existencia Inicial', this.regInventario.existenciaInicial);
                console.log('Existencia Actual', this.regInventario.existenciaActual);
                
                
              }
          })

          console.log('coincidencia', this.coincidencia);
        if(this.coincidencia === 1){
          this.regInventario.idInventario = this.idInventario

          console.log('existencia actual antes', this.regInventario.existenciaActual);

          this.regInventario.existenciaActual = ( this.cantidad - parseInt( this.regSalida.cantidad.toString())) 
          console.log('existencia actual despues', this.regInventario.existenciaActual);
          
          console.log('inventario', this.regInventario);
          this.regInventario.unidadMedida = this.unidadMedida
          this.services.actualizarInventario(this.regInventario).subscribe({
            next: () =>{

              this.services.agregarSalida(this.regSalida).subscribe({
                next: () =>{
                  
                },
                error: (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Insercion',
                    text: `No se pudo registrar la salida a almacen: ${err}`,
                  });
                }
              });
              Swal.fire({
                icon: 'success',
                title: 'Insercion',
                text: 'Registro Registrado con Exito',
              });
              
            },
            error: (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Insercion',
                text: `No se pudo registrar en inventario: ${err}`,
              });
            }
          })
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Insercion',
            text: 'No existe el ingrediente en inventario',
          });
        }
        }
      })
    }


}
