import { Component, Input } from '@angular/core';
import { Producto, ProductoDTO, ProductoViewModel } from '../../interfaces/producto.interface';
import { ProductosServiceService } from '../../service/productos-service.service';

@Component({
  selector: 'productos-card-productos',
  standalone: false,
  templateUrl: './card-productos.component.html',
  styleUrl: './card-productos.component.css'
})
export class CardProductosComponent {
  @Input()
  public producto!: ProductoDTO;  

}
