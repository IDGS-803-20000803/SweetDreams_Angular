import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-update-menu',
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent {
  constructor(private menu: MenuService, private router: Router, private recover: ActivatedRoute) { }

  id: number = 0;
  actMenu: any;

  ngOnInit(): void {

    this.recover.paramMap.subscribe(params => {

      const idParam = params.get('id');

      if (idParam) {
        this.id = Number(idParam);
      } else {
        this.id = 0;
      }
    });

    this.menu.obtenerMenu(this.id).subscribe({
      next: (res) => {
        this.actMenu = res;

        console.log(this.actMenu);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Es necesario llamar al administrador del sistema: ${err}`,
        });
      }
    });

    const inputFile = document.getElementById('inputFile') as HTMLInputElement;

    if (inputFile) {
      inputFile.addEventListener('change', async (event) => {
        const selectedFile = (event.target as HTMLInputElement).files?.[0]; // Usamos el operador de opción nula (?.) para acceder a la propiedad
        if (selectedFile) {
          try {
            const base64Image = this.imageToBase64(selectedFile);

            this.actMenu.foto = await base64Image.then((data:any) => 'data:image/jpeg;base64,' + data);

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Es necesario llamar al administrador del sistema: ${error}`,
            });
          }
        }
      });

    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error de Server',
        text: 'No se encontró el elemento inputFile.',
      });
      
    }
  }

  imageToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.result && typeof reader.result === 'string') {
          const base64Data = reader.result.split(',')[1]; // Eliminamos "data:image/jpeg;base64,"
          resolve(base64Data);
        } else {
          reject(new Error('Error al leer el archivo.'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Error al cargar el archivo.'));
      };

      reader.readAsDataURL(file);
    });
  }

  actualizar() {

    this.menu.actualizarMenu(this.actMenu).subscribe({
      next: (res) => {

        Swal.fire({
          title: 'Actualizado',
          text: 'El menu se actualizo correctamente',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload()
            
          }
        });
        this.router.navigate(['/menu']);
      },
      error: (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Error al Actualizar el menu: ${err}`,
        });
      }
    });


  }
}
