import { Component, Input } from '@angular/core';
import { ProductoViewModel } from '../../interfaces/producto.interface';

@Component({
  selector: 'productos-card-productos',
  standalone: false,
  templateUrl: './card-productos.component.html',
  styleUrl: './card-productos.component.css'
})
export class CardProductosComponent {
  @Input()
  public producto!: ProductoViewModel;  
}
