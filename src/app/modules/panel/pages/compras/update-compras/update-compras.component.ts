import { Component } from '@angular/core';
import { ComprasService } from '../compras.service';
import { ProveedorService } from '../../proveedores/proveedor.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { UnidadesService } from '../../unidades/unidades.service';
import { MetodoPagoService } from '../../metodoPago/metodo-pago.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/interfaces/compras';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-compras',
  templateUrl: './update-compras.component.html',
  styleUrls: ['./update-compras.component.css']
})
export class UpdateComprasComponent {
  constructor(
    public compraService: ComprasService,
    public proveedorService: ProveedorService,
    public ingredienteService: IngredienteServicesService,
    public metodoPagoService: MetodoPagoService,
    private recover: ActivatedRoute,
    private router: Router
  ) { }

 
  id: number = 0;
  dataSource: any = [];
  dataIngredient: any = [];
  dataCompra: any = [];
  dtCompraActivos: any = [];

  
  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('idCompra');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    // Obtener datos de ingrediente:
    this.ingredienteService.showIngredients().subscribe({
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

    this.compraService.getDetallesCompras().subscribe({
      next: (response) => {
        //this.dataSource = response;
        this.dtCompraActivos = response
        for (let index = 0; index < this.dtCompraActivos.length; index++) {
            if (this.dtCompraActivos[index].estatus == "1") {
              this.dataSource.push(this.dtCompraActivos[index]);
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

    this.compraService.getCompra().subscribe({
      next: (response) => {
        this.dataCompra = response;
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

  private filterData(): void {
    this.dataSource = this.dataSource.filter(
      (item: any) => item.idCompra === this.id
    );
  }
 
}
