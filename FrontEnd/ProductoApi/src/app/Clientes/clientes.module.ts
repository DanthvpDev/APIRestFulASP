import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [

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
