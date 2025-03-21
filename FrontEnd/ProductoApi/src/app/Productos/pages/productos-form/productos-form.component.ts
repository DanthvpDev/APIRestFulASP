import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosServiceService } from '../../service/productos-service.service';
import { ProveedorDTO } from '../../interfaces/proveedor.interface';
import { from } from 'rxjs';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-productos-form',
  standalone: false,
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.css'
})
export class ProductosFormComponent {
  public proveedores : ProveedorDTO[] = [];
  public proveedorSeleccionado?: ProveedorDTO;
  public formularioProductos!: FormGroup;
  private archivo : File | null = null;

  constructor(private form: FormBuilder, private productosService: ProductosServiceService, private route: Router) {
    this.crearFormulario();
    this.productosService.obtenerProveedores().subscribe(
      data => {this.proveedores = data}
    );
    console.log(this.proveedores);
  }

  recibirProveedores(proveedor : ProveedorDTO){
    this.proveedorSeleccionado = proveedor;
  }

  crearFormulario(): void {
    this.formularioProductos = this.form.group({
      nombre: ['', Validators.required],
      precio: [0, Validators.required],
      foto: [''],
      proveedorId: [0, [Validators.required]]
    })
  }

  async onFileSelected(event: any) {
    const input = event.target as HTMLInputElement;
    if(input.files && input.files?.length > 0 ){
      this.archivo = input.files[0];
    }
  
  }

  enviarFormulario(): void {
    if(this.formularioProductos.valid){
      let formulario = new FormData();
      formulario.append("nombre", this.formularioProductos.get("nombre")?.value);
      formulario.append("precio", this.formularioProductos.get("precio")?.value);
      formulario.append("proveedorId", this.formularioProductos.get("proveedorId")?.value);
      if (this.archivo) formulario.append("foto", this.archivo, this.archivo.name);
      console.log(formulario.getAll("proveedorId"))

      this.productosService.agregarProducto(formulario).subscribe({
        next: ()=> {
          this.route.navigate(["/clientes-form"]);
          alert('Se ha creado el producto correctamente');
          this.formularioProductos.reset();
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
  }
}
