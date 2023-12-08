import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelRoutingModule } from './panel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { EmpleadoComponent } from './pages/empleado/empleado.component';
import { PuestosComponent } from './pages/puestos/puestos.component';
import { DepartamentosComponent } from './pages/departamentos/departamentos.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { VentasComponent } from './pages/ventas/ventas.component';
import { ComprasComponent } from './pages/compras/compras.component';
import { MenuComponent } from './pages/menu/menu.component';
import { RecetaComponent } from './pages/receta/receta.component';
import { IngredienteComponent } from './pages/ingrediente/ingrediente.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { FormsModule } from '@angular/forms';
import { PanelComponent } from './page/panel/panel.component';
import { InsertIngredientesComponent } from './pages/ingrediente/insert-ingredientes/insert-ingredientes.component';
import { UnidadComponent } from './pages/unidades/unidad.component';
import { UnidadesInsertarComponent } from './pages/unidades/unidades-insertar/unidades-insertar.component';
import { UnidadesEditarComponent } from './pages/unidades/unidades-editar/unidades-editar.component';
import { ActualizarIngredienteComponent } from './pages/ingrediente/actualizar-ingrediente/actualizar-ingrediente.component';
import { AgregarDepartamentoComponent } from './pages/departamentos/insertar/agregar-departamento/agregar-departamento.component';
import { ActualizarDepartamentoComponent } from './pages/departamentos/actualizar-departamento/actualizar-departamento.component';
import { InsertarRecetaComponent } from './pages/receta/insertar-receta/insertar-receta.component';
import { ActualizarRecetaComponent } from './pages/receta/actualizar-receta/actualizar-receta.component';
import { DetalleRecetaComponent } from './pages/receta/detalle-receta/detalle-receta.component';
import { InsertarClienteComponent } from './pages/cliente/insertar-cliente/insertar-cliente.component';
import { ActualizarClienteComponent } from './pages/cliente/actualizar-cliente/actualizar-cliente.component';
import { InsertarProveedorComponent } from './pages/proveedores/insertar-proveedor/insertar-proveedor.component';
import { UpdateProveedorComponent } from './pages/proveedores/update-proveedor/update-proveedor.component';
import { InsertMenuComponent } from './pages/menu/insert-menu/insert-menu.component';
import { UpdateMenuComponent } from './pages/menu/update-menu/update-menu.component';
import { EntradasComponent } from './pages/inventario/entradas/entradas.component';
import { InsertEntradaComponent } from './pages/inventario/entradas/insert-entrada/insert-entrada.component';
import { SalidasComponent } from './pages/inventario/salidas/salidas.component';
import { InsertSalidasComponent } from './pages/inventario/salidas/insert-salidas/insert-salidas.component';
import { NgChartsModule } from 'ng2-charts';
import { InsertEmpleadoComponent } from './pages/empleado/insert-empleado/insert-empleado.component';
import { ActualizarEmpleadoComponent } from './pages/empleado/actualizar-empleado/actualizar-empleado.component';
import { MetodoPagoComponent } from './pages/metodo-pago/metodo-pago.component';
import { InsertComprasComponent } from './pages/compras/insert-compras/insert-compras.component';
import { UpdateComprasComponent } from './pages/compras/update-compras/update-compras.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ClienteComponent,
    EmpleadoComponent,
    PuestosComponent,
    DepartamentosComponent,
    ProveedoresComponent,
    VentasComponent,
    ComprasComponent,
    MenuComponent,
    RecetaComponent,
    IngredienteComponent,
    InventarioComponent,
    PanelComponent,
    InsertIngredientesComponent,
    UnidadComponent,
    UnidadesInsertarComponent,
    UnidadesEditarComponent,
    ActualizarIngredienteComponent,
    AgregarDepartamentoComponent,
    ActualizarDepartamentoComponent,
    InsertarRecetaComponent,
    ActualizarRecetaComponent,
    DetalleRecetaComponent,
    InsertarClienteComponent,
    ActualizarClienteComponent,
    InsertarProveedorComponent,
    UpdateProveedorComponent,
    InsertMenuComponent,
    UpdateMenuComponent,
    EntradasComponent,
    InsertEntradaComponent,
    SalidasComponent,
    InsertSalidasComponent,
    InsertEmpleadoComponent,
    ActualizarEmpleadoComponent,
    MetodoPagoComponent,
    InsertComprasComponent,
    UpdateComprasComponent
  ],
  imports: [
    CommonModule,
    PanelRoutingModule,
    RouterModule,
    SharedModule,
    FormsModule,
    NgChartsModule
  ]
})
export class PanelModule { }
