import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { ProveedorService } from '../proveedores/proveedor.service';
import { IngredienteServicesService } from '../ingrediente/services/ingrediente-services.service';
import { Router } from '@angular/router';
import { ComprasService } from './compras.service';
import { MetodoPagoService } from '../metodoPago/metodo-pago.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent {
  constructor(
    public compra: ComprasService,
    public proveedorSevice: ProveedorService,
    public metodoPagoService: MetodoPagoService,
    private router: Router
  ) { }

  compras: any = [];
  dtComprasActivas: any = [];

  dtMetodoPago : any = [];

  proveedores: any = [];
  dtProveedores: any = [];

  ngOnInit(): void {
    this.compra.getCompra().subscribe({
      next: (response) => {
        this.dtComprasActivas = response
        console.log(response);
        
        for (let index = 0; index < this.dtComprasActivas.length; index++) {
          
            this.compras.push(this.dtComprasActivas[index])
          
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
   
    this.proveedorSevice.getProveedores().subscribe({
      next: (response) => {
        this.dtProveedores = response
        for (let index = 0; index <  this.dtProveedores.length; index++) {
          if (this.dtProveedores[index].estatus) {
            this.proveedores.push( this.dtProveedores[index])
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
  }

  openInsertCompra() {
    this.router.navigate(['/agregarCompra']);
  }

  openDetailWindow(data: any) {
    this.router.navigate([`/detalleCompra/${data.idCompra}`]);
  }

  
}
