import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrClienteComponent } from './components/tr-cliente/tr-cliente.component';
import { EditarClienteComponent } from './components/editar-cliente/editar-cliente.component';

@NgModule({
  declarations: [
    TrClienteComponent,
    ClientesListComponent,
    EditarClienteComponent


  ],
  imports: [

    CommonModule,
    ClientesRoutingModule,
    ClientesFormComponent,
    ReactiveFormsModule,
    FormsModule

  ],
  exports: [

    ClientesListComponent,
    TrClienteComponent

  ]
})
export class ClientesModule { }
