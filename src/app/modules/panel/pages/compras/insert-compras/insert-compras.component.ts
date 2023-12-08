import { Component } from '@angular/core';
import { ProveedorService } from '../../proveedores/proveedor.service';
import { MetodoPagoService } from '../../metodoPago/metodo-pago.service';
import { ComprasService } from '../compras.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { Router } from '@angular/router';
import { Compra } from 'src/app/interfaces/compras';
import Swal from 'sweetalert2';
import { Entrada } from 'src/app/interfaces/entrada';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from '../../inventario/inventario.service';

@Component({
  selector: 'app-insert-compras',
  templateUrl: './insert-compras.component.html',
  styleUrls: ['./insert-compras.component.css']
})
export class InsertComprasComponent {
  constructor(
    public proveedorService: ProveedorService,
    public compras: ComprasService,
    public ingredienteService: IngredienteServicesService,
    public metodoPagoService: MetodoPagoService,
    public entradasService: InventarioService,
    public router: Router
  ) { }

  proveedores: any = [];
  dtProveedores: any = [];
  dtInventario : any = [];

  dataIngredient: any = [];
  dtIngredienteActivos: any = [];
  dtIngredienteSelect : any = [];
  dtMetodoPago: any =[];
  dtCompras: any = [];
  dtFinalCompra : any = [];

  coincidenciaInventario: number = 0;
  cantidadInventario:number = 0;
  proveedorId: number = 0;
  metodoPagoId: number = 0;
  total: number = 0;
  IngredienteId: number = 0;
  unidadMedida: string = "";
  numArreglo: number = 0;
  cantidad: number = 0;
  precio:number = 0;
  totalDetalles: number = 0;
  idCompra: number = 0;
  coincidencia: number = 0;
  cantidadExtra:number = 0;
  suma: number = 0;
  idInventario:number = 0;

  regCompra: Compra = {
    idCompra: 0,
    idProveedor: 0,
    idMetodoPago: 0,
    idUsuario: 1,
    totalCompra: 0,
    fechaCreacion: new Date(),
    estatus: 1
  };

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


  dtDetalleTemporal : any = [];
  detalles: any = []

  ObtenerUnidadIngrediente(){
    if (this.IngredienteId !== 0){

      this.ingredienteService.searchIngredient(this.IngredienteId).subscribe({
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

  ObtenerCompraInsertada(){
    this.compras.getCompra().subscribe({
      next: (response) => {
        this.dtCompras = response
        console.log('Compras', this.dtCompras);
        const ultimaPosicion = this.dtCompras.length - 1;
        this.dtFinalCompra = this.dtCompras[ultimaPosicion];
        this.idCompra = this.dtFinalCompra.idCompra;
        console.log('Posicion Arreglo', ultimaPosicion);
        console.log('idCompra', this.idCompra);
       this.addDetail()
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });

        Swal.fire({
          icon: 'success',
          title: 'Inserción',
          text: 'Compra Registrada con Exito',
        });
          this.router.navigate(['/compra']);
      },
    });
      
  }


  addCompra(){
    if(this.regCompra.idProveedor === 0  || this.regCompra.idMetodoPago === 0 ){
      Swal.fire({
        icon: 'error',
        title: 'Campos Vacios',
        text: 'No puedes guardar campos vacios',
      });
      return
    }

    if (this.regCompra.totalCompra == 0){
      Swal.fire({
        icon: 'error',
        title: 'Compra Invalida',
        text: 'No puedes realizar compras con total en 0',
      });
      return
    }

    console.log(this.regCompra);
    
    
    this.compras.agregarCompra(this.regCompra).subscribe({
      next: () => {
        console.log('Encabezado Compra Insertado');
        this.ObtenerCompraInsertada()
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error Comprar ',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      },
    });


  }



  agregarDetalle(){
    if(this.IngredienteId === 0 || this.cantidad === 0 || this.precio === 0){
      Swal.fire({
        icon: 'error',
        title: 'Detalle Compra Invalido',
        text: 'No puedes Agregar un detalle de compra vacio',
      });
      return
    }
    this.detalles.idIngrediente = Number(this.IngredienteId)
    this.detalles.unidadMedida = this.unidadMedida
    this.detalles.cantidad = Number(this.cantidad)
    this.detalles.precioUnitario = Number(this.precio)
    if (this.unidadMedida == "Gramos") {
      this.detalles.total = ((Number(this.cantidad) / 1000) * Number(this.precio))
      this.totalDetalles = ((Number(this.cantidad) / 1000) * Number(this.precio))
    } else {
      this.detalles.total = (Number(this.cantidad) * Number(this.precio))
      this.totalDetalles = (Number(this.cantidad) * Number(this.precio))
    }
    this.numArreglo = this.dtDetalleTemporal.length
    console.log('Longitud arreglo:' + this.numArreglo);
    if (this.numArreglo == 0) {
      this.dtDetalleTemporal.push(this.detalles)
      console.log('Detalle Insertado', this.dtDetalleTemporal);
    }
    else if(this.numArreglo > 0) {
      
      for (let i = 0; i < this.numArreglo; i++) {
           
          if(this.IngredienteId === this.dtDetalleTemporal[i].idIngrediente){
            this.coincidencia = 1; 
            this.cantidadExtra = this.dtDetalleTemporal[i].cantidad;             
          }
      }
      if (this.coincidencia == 1){
        this.suma = Number(this.cantidadExtra) + Number(this.cantidad);
        this.detalles.cantidad = (this.suma)
        this.detalles.precioUnitario = this.precio

        if (this.unidadMedida == "Gramos") {
          this.detalles.total = ((Number(this.suma) / 1000) * Number(this.precio))
          this.totalDetalles = ((Number(this.suma) / 1000) * Number(this.precio))
        } else {
          this.detalles.total = (Number(this.suma) * Number(this.precio))
          this.totalDetalles = (Number(this.suma) * Number(this.precio))
        }


        this.eliminarDetalle(this.IngredienteId)
        this.dtDetalleTemporal.push(this.detalles)
      }
      else {
        this.dtDetalleTemporal.push(this.detalles)
      }
  }

  this.regCompra.totalCompra = 0
  for (let index = 0; index < this.dtDetalleTemporal.length; index++) {
    this.regCompra.totalCompra += this.dtDetalleTemporal[index].total
  }
  console.log('Detalle Temporal Final', this.dtDetalleTemporal);
  this.coincidencia = 0;
  this.cantidadExtra = 0;
  this.suma = 0;
  this.detalles = []; 
  }
  
  eliminarDetalle(id: number){
    const indexToRemove = this.dtDetalleTemporal.findIndex((detalle: any) => detalle.idIngrediente === id);

  if (indexToRemove !== -1) {
    this.dtDetalleTemporal.splice(indexToRemove, 1);
    console.log('Detalle eliminado:', id);
  } else {
    console.log('Detalle no encontrado para el id:', id);
  }

  this.regCompra.totalCompra = 0
  for (let index = 0; index < this.dtDetalleTemporal.length; index++) {
    this.regCompra.totalCompra += this.dtDetalleTemporal[index].total
  }
  }

  addDetail() {
   
      this.entradasService.getInventario().subscribe({
        next:(response) =>{
          this.dtInventario = response
          console.log('Todo Inventario', this.dtInventario);
          this.dtDetalleTemporal.forEach((detallesR : any) =>{
            console.log('Detalles', detallesR);
              this.addInventory(detallesR);
            });
        }})
        Swal.fire({
          icon: 'success',
          title: 'Inserción',
          text: 'Compra Registrada con Exito',
        });
          this.router.navigate(['/compras']);

  }
  addEntrada(dtTemporal:any){
   
      this.regEntrada.idIngrediente = dtTemporal.idIngrediente;
      this.regEntrada.unidadMedida = dtTemporal.unidadMedida;
      this.regEntrada.cantidad = dtTemporal.cantidad;

       this.entradasService.agregarEntrada(this.regEntrada).subscribe({
        next: () =>{
         
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Insercion',
            text: `No se pudo registrar la entrada a almacen: ${err}`,
          });
        }
      });
   
  }

  addInventory(dtTemporal:any){

    this.regInventario.idIngrediente = dtTemporal.idIngrediente;
    this.regInventario.existenciaInicial = dtTemporal.cantidad
    this.regInventario.existenciaActual = dtTemporal.cantidad
    this.regInventario.unidadMedida =  dtTemporal.unidadMedida
        
        this.dtInventario.forEach((inventario:any) =>{  
          if( inventario.idIngrediente.toString() === this.regInventario.idIngrediente){
              console.log('Encontrado');
              
              this.coincidenciaInventario = 1
              this.cantidadInventario = inventario.existenciaActual
              this.idInventario = inventario.idInventario
            }
        })
        
        if(this.coincidenciaInventario === 1){
          this.regInventario.idInventario = this.idInventario
          console.log('existencia actual antes', this.regInventario.existenciaActual);
          
          this.regInventario.existenciaActual = (parseInt( this.regInventario.existenciaActual.toString()) + this.cantidadInventario)
         
          console.log('existencia actual despues', this.regInventario.existenciaActual);
          
          console.log('inventario', this.regInventario);
          
          this.entradasService.actualizarInventario(this.regInventario).subscribe({
            next: () =>{
              this.entradasService.agregarInventario(this.regInventario).subscribe({
                next: () =>{
                  console.log('Inventario Insertado');
                  
                  this.compras.detalleCompra({
                    idCompraDetalle: 0,
                    idCompra: this.idCompra,
                    idIngrediente: dtTemporal.idIngrediente,
                    unidadMedida: dtTemporal.unidadMedida,
                    cantidad: dtTemporal.cantidad,
                    precioUnitario: dtTemporal.precioUnitario,
                    total: dtTemporal.total,
                    estatus: "1"
                    }).subscribe({
                      next: () => {
                        console.log('Detalle Insertado', dtTemporal);
                        console.log("Comienza a insertar entradas");
                        this.addEntrada(dtTemporal); 
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
                },
                error: (err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Insercion',
                    text: `No se pudo registrar en inventario: ${err}`,
                  });
                }
              });
             console.log('Inventario Actualizado');
             
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
          this.entradasService.agregarInventario(this.regInventario).subscribe({
            next: () =>{
              console.log('Inventario Insertado');
              
              this.compras.detalleCompra({
                idCompraDetalle: 0,
                idCompra: this.idCompra,
                idIngrediente: dtTemporal.idIngrediente,
                unidadMedida: dtTemporal.unidadMedida,
                cantidad: dtTemporal.cantidad,
                precioUnitario: dtTemporal.precioUnitario,
                total: dtTemporal.total,
                estatus: "1"
                }).subscribe({
                  next: () => {
                    console.log('Detalle Insertado', dtTemporal);
                    console.log("Comienza a insertar entradas");
                    this.addEntrada(dtTemporal); 
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

  ngOnInit(): void {
      
    this.proveedorService.getProveedores().subscribe({
      next: (response) => {
        this.dtProveedores = response
        for (let index = 0; index <  this.dtProveedores.length; index++) {
          if (this.dtProveedores[index].estatus) {
            this.proveedores.push(this.dtProveedores[index])
          }
        }
     
        
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      }
    });

    this.metodoPagoService.getMetodoPago().subscribe({
      next: (response) => {
        this.dtMetodoPago = response
        
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      }
    });
    
       // Obtener datos de ingrediente:
   this.ingredienteService.showIngredients().subscribe({
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
