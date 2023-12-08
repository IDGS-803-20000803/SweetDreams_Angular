import { Component } from '@angular/core';
import { MenuService } from '../menu.service';
import { Router } from '@angular/router';
import { RecetaService } from '../../receta/service/receta.service';
import { Menu } from 'src/app/interfaces/menu';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-insert-menu',
  templateUrl: './insert-menu.component.html',
  styleUrls: ['./insert-menu.component.css']
})
export class InsertMenuComponent {
  constructor(public menu: MenuService, private router: Router, private receta: RecetaService) { }

  dtMenus: any = [];
  dtMenusActivos : any = [];
  recetas: any = [];
  recetasActivas : any = [];
  recetasUtilizadas : any = [];
  coincidencia :number = 0;

  regMenu: Menu = {
    idMenu: 0,
    idReceta: 0,
    foto: '',
    costo: 0,
    estatus: true,
    quantity: 0,
  }



  ngOnInit(): void {

    this.receta.showRecipes().subscribe({
      next: (res) => {
        //this.recetas = res;
        this.recetasActivas = res;
        for (let index = 0; index < this.recetasActivas.length; index++) {
         if (this.recetasActivas[index].estatus) {
            this.recetas.push(this.recetasActivas[index])
         }
          
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Ocurrio un error en el servidor : ${error}`,
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

            this.regMenu.foto = await base64Image.then((data) => 'data:image/jpeg;base64,' + data);

          } catch (error) {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: `Error de conversion de imagen: ${error}`,
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

  agregarMenu() {
    this.recetasUtilizadas = this.regMenu.idReceta
    this.menu.getMenu().subscribe({
      next: (response) =>{
        this.dtMenusActivos = response

        for (let index = 0; index < this.dtMenusActivos.length; index++) {
          if (this.dtMenusActivos[index].estatus) {

            this.dtMenus.push(this.dtMenusActivos[index])
          }
          
        }
        for (let i = 0; i < this.dtMenus.length; i++) {
         
          if (this.dtMenus[i].idReceta == this.recetasUtilizadas) {
            this.coincidencia = 1
          }
        }

        if (this.coincidencia == 1) {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: `No puedes agregar mas de un menu con la misma receta`,
          });
          return
        }
        else{
          this.menu.agregarMenu(this.regMenu).subscribe({

            next: (res) => {
              Swal.fire({
                icon: 'success',
                title: 'Insercion',
                text: 'Registro Registrado con Exito',
              });
              window.location.reload()
            },
            error: (error) => {
              Swal.fire({
                icon: 'error',
                title: 'Error de Server',
                text: `Ocurrio un error en el servidor : ${error}`,
              });
            }
          });
          this.router.navigate(['/menu']);
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: `Ocurrio un error en el servidor : ${error}`,
        });
      }
    });

   
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
}
