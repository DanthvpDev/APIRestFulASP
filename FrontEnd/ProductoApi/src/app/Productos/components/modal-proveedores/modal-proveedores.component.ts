import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductosServiceService } from '../../service/productos-service.service';
import { ProveedorDTO } from '../../interfaces/proveedor.interface';

@Component({
  selector: 'productos-modal-proveedores',
  standalone: false,
  templateUrl: './modal-proveedores.component.html',
  styleUrl: './modal-proveedores.component.css'
})
export class ModalProveedoresComponent {

  @Input()
  public proveedores : ProveedorDTO[] = [];

  @Output()
  public proveedorAEnviar = new EventEmitter<ProveedorDTO>();

  enviarDatos(proveedor: ProveedorDTO) {
    this.proveedorAEnviar.emit(proveedor);
  }
  
}
