import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrClienteComponent } from './components/tr-cliente/tr-cliente.component';

@NgModule({
  declarations: [

  
    TrClienteComponent
  ],
  imports: [

    CommonModule,
    ClientesRoutingModule,
    ClientesFormComponent,
    ReactiveFormsModule,
    ClientesListComponent

  ]
})
export class ClientesModule { }
