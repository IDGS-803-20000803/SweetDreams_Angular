import { Component } from '@angular/core';
import { ComprasService } from '../compras/compras.service';
import { ClienteService } from '../cliente/cliente.service';
import { MetodoPagoService } from '../metodoPago/metodo-pago.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  constructor(
    public venta: ComprasService,
    public services: ClienteService,
    public metodoPagoService: MetodoPagoService,
    private router: Router
  ) { }

  pedidos: any = [];

  dtMetodoPago : any = [];

  clientes: any = [];
  dtClientes: any = [];
 

  ngOnInit(): void {

    this.services.getClientes().subscribe({
      next: (response) => {
        this.clientes = response;
      
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Ocurrio un error en el servidor : ${error}`,
        });
      },
    })

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

    this.venta.getPedidos().subscribe({
      next: (response) =>{
        this.pedidos = response;
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

  openDetailWindow(data: any) {
    this.router.navigate([`/detalleVenta/${data.idCompra}`]);
  }

  cambiarEstatus(id:number) {

  }
}
