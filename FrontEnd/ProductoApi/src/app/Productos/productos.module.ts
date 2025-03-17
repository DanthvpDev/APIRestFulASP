import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosFormComponent } from './pages/productos-form/productos-form.component';


@NgModule({
  declarations: [
    ProductosListComponent,
    ProductosFormComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule
  ]
})
export class ProductosModule { }
