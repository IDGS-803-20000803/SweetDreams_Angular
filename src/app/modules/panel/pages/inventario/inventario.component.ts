import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { InventarioService } from './inventario.service';
import { IngredienteServicesService } from '../ingrediente/services/ingrediente-services.service';
import Swal from 'sweetalert2';
import { UnidadesService } from '../unidades/unidades.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {

  constructor(private router: Router, private services: InventarioService,
    private IngredienteS : IngredienteServicesService){}

  dataSource: any = [];
  dtIngredientes:any = []


  ngOnInit(): void {
    this.services.getInventario().subscribe({
      next: (response) =>{
        this.dataSource = response
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al consultar Almacen: ${error}`,
        });
      },
    })
    this.IngredienteS.showIngredients().subscribe({
      next: (response) => {
        this.dtIngredientes = response;
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al consultar ingredientes: ${error}`,
        });
      },
    });

  }
  Entradas()
  {
    this.router.navigate(['/Entradas']);
  }
  Salidas(){
    this.router.navigate(['/Salidas']);
  }
}
