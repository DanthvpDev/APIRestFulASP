import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductosRoutingModule } from './productos-routing.module';
import { ProductosListComponent } from './pages/productos-list/productos-list.component';
import { ProductosFormComponent } from './pages/productos-form/productos-form.component';
import { CardProductosComponent } from './components/card-productos/card-productos.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalProveedoresComponent } from './components/modal-proveedores/modal-proveedores.component';
import { ProductoEditarComponent } from './pages/producto-editar/producto-editar.component';


@NgModule({
  declarations: [
    ProductosListComponent,
    ProductosFormComponent,
    CardProductosComponent,
    ModalProveedoresComponent,
    ProductoEditarComponent
  ],
  imports: [
    CommonModule,
    ProductosRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductosModule { }
