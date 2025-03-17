import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesFormComponent } from './pages/clientes-form/clientes-form.component';
import { ClientesListComponent } from './pages/clientes-list/clientes-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TrClienteComponent } from './components/tr-cliente/tr-cliente.component';

@NgModule({
  declarations: [

<<<<<<< HEAD
  
    TrClienteComponent
=======
    TrClienteComponent,
    ClientesListComponent

>>>>>>> 6a32a9af8a13cff27bbc5ff33d0c200842d954ed
  ],
  imports: [

    CommonModule,
    ClientesRoutingModule,
    ClientesFormComponent,
    ReactiveFormsModule,

  ],
  exports: [

    ClientesListComponent,
    TrClienteComponent

  ]
})
export class ClientesModule { }
