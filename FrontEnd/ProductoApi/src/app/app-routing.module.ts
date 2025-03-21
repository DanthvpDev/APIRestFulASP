import { ClientesListComponent } from './Clientes/pages/clientes-list/clientes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './Clientes/pages/clientes-form/clientes-form.component';
import { EditarClienteComponent } from './Clientes/pages/editar-cliente/editar-cliente.component';
import { DetallesClienteComponent } from './Clientes/pages/detalles-cliente/detalles-cliente.component';
import { ProductosFormComponent } from './Productos/pages/productos-form/productos-form.component';
import { ProductosListComponent } from './Productos/pages/productos-list/productos-list.component';

const routes: Routes = [
  
  {
    path: 'clientes-form', component: ClientesFormComponent //ruta para el formulario de clientes
  },
  {
    path: 'clientes-list', component: ClientesListComponent
  },
  {
    path: 'clientes-list/editar/:id', component: EditarClienteComponent
  }
  ,
  {
    path: 'clientes-list/detalles/:id', component: DetallesClienteComponent
  },
  {
    path: '/productos-form', component: ProductosFormComponent
  },
  {
    path: '/productos-list', component: ProductosListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
