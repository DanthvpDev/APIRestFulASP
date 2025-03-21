import { Component } from '@angular/core';
import { Producto, ProductoViewModel } from '../../interfaces/producto.interface';
import { ProductosServiceService } from '../../service/productos-service.service';
import { ProveedorDTO } from '../../interfaces/proveedor.interface';

@Component({
  selector: 'app-productos-list',
  standalone: false,
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.css'
})
export class ProductosListComponent {
  public productos: Producto[] = [];


  constructor(private productoService : ProductosServiceService) {
    this.productoService.obtenerListaProductos().subscribe((productos) => {
      this.productos = productos;
    });
  }

  

}
