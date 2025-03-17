import { ClientesListComponent } from './Clientes/pages/clientes-list/clientes-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesFormComponent } from './Clientes/pages/clientes-form/clientes-form.component';

const routes: Routes = [
  
  {
    path: 'clientes-form', component: ClientesFormComponent //ruta para el formulario de clientes
  },
  {
    path: 'clientes-list', component: ClientesListComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
