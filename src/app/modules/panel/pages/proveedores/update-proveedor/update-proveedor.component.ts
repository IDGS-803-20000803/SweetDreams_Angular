import { Component } from '@angular/core';
import { ProveedorService } from '../proveedor.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-update-proveedor',
  templateUrl: './update-proveedor.component.html',
  styleUrls: ['./update-proveedor.component.css']
})
export class UpdateProveedorComponent {
  constructor(
    private service: ProveedorService,
    private router: Router,
    private recover: ActivatedRoute
  ) {}

  id: number = 0;
  regProveedor: any = {};

  ngOnInit(): void {
    this.recover.paramMap.subscribe((params) => {
      const idParam = params.get('idProveedor');
      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    this.service.obtenerProveedor(this.id).subscribe({
      next: (response) => {
        this.regProveedor = response;
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

  Actualizar(){
    this.service.actualizarProveedor(this.regProveedor).subscribe({
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
          text: `Es necesario llamar al administrador del sistema: ${error}`,
        });
      },
    });
    this.router.navigate(['/proveedores']);
  }

}
