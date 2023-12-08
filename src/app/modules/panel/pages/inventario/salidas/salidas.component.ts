import { Component } from '@angular/core';
import { InventarioService } from '../inventario.service';
import { IngredienteServicesService } from '../../ingrediente/services/ingrediente-services.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-salidas',
  templateUrl: './salidas.component.html',
  styleUrls: ['./salidas.component.css']
})
export class SalidasComponent {

  dataSource:any = [];
  dtIngredientes:any = [];
  


  constructor(private services: InventarioService, private router: Router,
    private IngredienteS:IngredienteServicesService){}

    ngOnInit() {
      this.services.getSalidas().subscribe({
        next: (response) =>{
          this.dataSource = response
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `Error al consultar salidas almacen: ${error}`,
          });
        },
      });

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

    Agregar(){
      this.router.navigate(['/InsertarSalida']);
    }
}
