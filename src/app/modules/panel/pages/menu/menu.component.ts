import { Component } from '@angular/core';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import { RecetaService } from '../receta/service/receta.service';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(public menu: MenuService, private router: Router, private receta: RecetaService) { }

  dataSource: any = [];
  dtMenus:any = [];
  dtMenuActualizar :any =[];
  dtReceta :any = [];

  ngOnInit() {

    this.menu.getMenu().subscribe(
      {
        next: response => {

          this.dtMenus = response;

          for (let index = 0; index < this.dtMenus.length; index++) {
              if (this.dtMenus[index].estatus) {
                  this.dataSource.push(this.dtMenus[index])
              }
          }
        },
        error: error => {
          Swal.fire({
            icon: 'error',
            title: 'Error de Server',
            text: 'Es necesario llamar al administrador del sistema',
          });
        }
      }
    );
    
    this.receta.showRecipes().subscribe({
      next: (response) =>{
        this.dtReceta = response
      },
      error: (error) =>{
        Swal.fire({
          icon: 'error',
          title: 'Error de Server',
          text: 'Es necesario llamar ',
        });
      }
    })


  }

  openInsertMenu() {
    this.router.navigate(['/agregarMenu']);
  }

  openEditarMenu(data: any) {
    this.router.navigate([`/editarMenu/${data.idMenu}`]);
  }

  eliminarMenu(id: number) {

    Swal.fire({
      title: '¿Está seguro de eliminar el menú?',
      text: "No podrá revertir esta acción",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {

        this.menu.obtenerMenu(id).subscribe({
          next: (res) => {
            this.dtMenuActualizar = res;
            this.dtMenuActualizar.estatus = false;
            this.menu.actualizarMenu( this.dtMenuActualizar).subscribe({
              next: () => {
                Swal.fire({
                  icon: 'success',
                  title: 'Eliminacion',
                  text: 'Registro Eliminado con Exito',
                });
                window.location.reload();
              },
              error: (err) => {
                Swal.fire({
                  icon: 'error',
                  title: 'Error de Server',
                  text: 'Es necesario llamar al administrador del sistema',
                });
              }
            })
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error de Server',
              text: 'No se pudo eliminar el menu',
            });
          }
        });
      }
    });
  }
}
