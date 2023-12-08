import { Component } from '@angular/core';
import { IngredienteServicesService } from '../services/ingrediente-services.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-actualizar-ingrediente',
  templateUrl: './actualizar-ingrediente.component.html',
  styleUrls: ['./actualizar-ingrediente.component.css']
})
export class ActualizarIngredienteComponent {
  constructor(
    private service: IngredienteServicesService,
    private router: Router,
    private recover: ActivatedRoute 
  ) {}

  id: number = 0;
  actIngredient: any = {};
  dataUnit: any = [];

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('idIngrediente');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    this.service.searchIngredient(this.id).subscribe({
      next: (response) => {
        this.actIngredient = response;
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

  editIngredient() {
    this.service.updateIngredient(this.actIngredient).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizacion',
          text: 'Registro Actualizado con Exito',
        });
        window.location.reload();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario contactar al administrador del sistema: ${error}`,
        });
      },
    });
    this.router.navigate(['/ingredientes']);
  }
}
