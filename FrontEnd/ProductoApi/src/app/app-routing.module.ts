import { ClientesListComponent } from './Clientes/pages/clientes-list/clientes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './Clientes/pages/clientes-form/clientes-form.component';
import { ProductosListComponent } from './Productos/pages/productos-list/productos-list.component';
import { ProductosFormComponent } from './Productos/pages/productos-form/productos-form.component';

const routes: Routes = [
  
  {
    path: 'clientes-form', component: ClientesFormComponent //ruta para el formulario de clientes
  },
  {
    path: 'clientes-list', component: ClientesListComponent
  },
  {
    path: 'productos-list', component: ProductosListComponent
  },
  {
    path: 'productos-form', component: ProductosFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
