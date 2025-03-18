import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosServiceService } from '../../service/productos-service.service';
import { ProveedorDTO } from '../../interfaces/proveedor.interface';
import { from } from 'rxjs';

@Component({
  selector: 'app-productos-form',
  standalone: false,
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css'
})
export class ProductosFormComponent {
  public proveedores : ProveedorDTO[] = [];
  public proveedorSeleccionado?: ProveedorDTO;
   formularioProductos!: FormGroup;

  constructor(private form: FormBuilder, private productosService: ProductosServiceService) {
    this.crearFormulario();
    this.productosService.obtenerProveedores().subscribe(
      data => {this.proveedores = data}
    );
    console.log(this.proveedores);
  }

  recibirCliente(proveedor : ProveedorDTO){
    this.proveedorSeleccionado = proveedor;
  }

  crearFormulario(): void {
    this.formularioProductos = this.form.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      foto: ['', [Validators.required, Validators.email]],
      proveedorId: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
    })
  }

  convertirImagen(archivo: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(archivo);
      reader.onload = ()=> resolve(reader.result as string);
      reader.onerror = error => reject(error); 
    });
  }

  async agregarImagenFormulario(event:any) {
    const input = event.target as HTMLInputElement;

    if(!input.files || input.files.length == 0)return;
    
    const base64 = await this.convertirImagen(input.files[0]);
    this.formularioProductos.patchValue({foto: base64})
    
  }

  enviarFormulario(): void {
    if(this.formularioProductos.valid){
      let formulario = new FormData();
      formulario.append("nombre", this.formularioProductos.get("nombre")?.value);
      formulario.append("precio", this.formularioProductos.get("precio")?.value);
      formulario.append("proveedorId", this.formularioProductos.get("proveedorId")?.value);
      formulario.append("foto", this.formularioProductos.get("foto")?.value);

      this.productosService.agregarProducto(formulario).subscribe({
        next: ()=> {
          alert('Se ha creado el producto correctamente');
          this.formularioProductos.reset();
        },
        error: () => {
          alert('Error al intentar agregar el producto, por favor revise la información proporcionada e intente nuevamente.')
        }
      })
    }
  }
}
