import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  linksMenu:Array<any>=[]
    
  constructor(){}

  ngOnInit(): void {
    this.linksMenu = [
      {
        nombre:'DashBoard',
        icono:'uil uil-create-dashboard',
        router:['/','dashboard']
      },
      {
        nombre:'Clientes',
        icono:'uil uil-house-user',
        router:['/','cliente']
      },
      {
        nombre:'Empleados',
        icono:'uil uil-user-md',
        router:['/','empleados']
      },
      {
        nombre:'Departamentos',
        icono:'uil uil-house-user',
        router:['/','departamentos']
      },
      {
        nombre:'Proveedores',
        icono:'uil uil-users-alt',
        router:['/','proveedores']
      },
      {
        nombre:'Ventas',
        icono:'uil uil-comparison',
        router:['/','ventas']
      },
      {
        nombre:'Compras',
        icono:'uil uil-chart-down',
        router:['/','compras']
      },
      {
        nombre:'Menu',
        icono:'uil uil-book-reader',
        router:['/','menu']
      },
      {
        nombre:'Recetas',
        icono:'uil uil-restaurant',
        router:['/','recetas']
      },
      {
        nombre:'Ingredientes',
        icono:'uil uil-apple',
        router:['/','ingredientes']
      },
      {
        nombre:'Unidades',
        icono:'uil uil-invoice',
        router:['/','unidades']
      },
      {
        nombre:'Inventario',
        icono:'uil uil-setting',
        router:['/','inventario']
      },
      {
        nombre:'Log Out',
        icono:'uil uil-sign-out-alt',
        router:['/']
      }
    ]
  }
}
