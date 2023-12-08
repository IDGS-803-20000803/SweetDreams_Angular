import { Component } from '@angular/core';
import { IngredienteServicesService } from '../services/ingrediente-services.service';
import { Router } from '@angular/router';
import { Ingredientes } from 'src/app/interfaces/ingredientes';
import { UnidadesService } from '../../unidades/unidades.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-insert-ingredientes',
  templateUrl: './insert-ingredientes.component.html',
  styleUrls: ['./insert-ingredientes.component.css']
})
export class InsertIngredientesComponent {
  constructor(
    private service: IngredienteServicesService,
    private router: Router
  ) {}

  regIngredient: Ingredientes = {
    idIngrediente: 0,
    nombre: '',
    unidadMedida: '',
    cantidadMedida: 0,
    estatus: true
  };

  dataUnit: any = [];

  ngOnInit(): void {}

  addIngredient() {
    // Verificar si los campos están vacíos
    if (
      this.regIngredient.nombre === '' ||
      this.regIngredient.unidadMedida === ''
    ) {
      Swal.fire({
        icon: 'error',
        title: 'Campos vacíos',
        text: 'Por favor, completa todos los campos antes de registrar.',
      });
      return; // Detener la función si hay campos vacíos
    }
    this.service.insertIngredient(this.regIngredient).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success',
          title: 'Inserción',
          text: 'Registro Insertado con Exito',
        });
        window.location.reload();
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      },
    });
    this.router.navigate(['/ingredientes']);
  }
}
