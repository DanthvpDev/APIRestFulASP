import { Component } from '@angular/core';
import { ProveedorDTO } from '../../interfaces/proveedor.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosServiceService } from '../../service/productos-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto, ProductoDTO } from '../../interfaces/producto.interface';

@Component({
  selector: 'app-producto-editar',
  standalone: false,
  templateUrl: './producto-editar.component.html',
  styleUrl: './producto-editar.component.css'
})
export class ProductoEditarComponent {
  public proveedores: ProveedorDTO[] = [];
  public proveedorSeleccionado?: ProveedorDTO;
  public formularioProductos!: FormGroup;
  private archivo: File | null = null;
  private producto : Producto = {} as Producto;

  constructor(private form: FormBuilder, private productosService: ProductosServiceService, private route: Router, private activateRoute: ActivatedRoute) {
    this.crearFormulario();
    this.productosService.obtenerProveedores().subscribe(
      data => { this.proveedores = data }
    );
    console.log(this.proveedores);
  }

  crearFormulario(): void {
    this.formularioProductos = this.form.group({
      id: [0, Validators.required],
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

  recibirProveedores(proveedor : ProveedorDTO){
    this.proveedorSeleccionado = proveedor;
  }


  enviarFormulario(): void {
    if(this.formularioProductos.valid){
      let formulario = new FormData();
      formulario.append("id", this.formularioProductos.get("id")?.value);
      formulario.append("nombre", this.formularioProductos.get("nombre")?.value);
      formulario.append("precio", this.formularioProductos.get("precio")?.value);
      formulario.append("proveedorId", this.formularioProductos.get("proveedorId")?.value);
      if (this.archivo) formulario.append("foto", this.archivo, this.archivo.name);

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

    ngOnInit(): void {
        this.activateRoute.params.subscribe(params => {
          const ID = Number(params["id"]);
          this.productosService.obtenerProductoPorId(ID).subscribe({
            next: (data) => {
              if (data != null){ 
                this.producto = data;
                this.formularioProductos.setValue({ 
                  id: data.id, 
                  nombre: data.nombre,
                  precio:data.precio,
                  proveedorId: data.proveedorId
                });
              }
              else{
                console.log("El producto no fue encontrado")
              }
            },
    
            error: (error) => {
              console.error(error);
            }
    
          });
        });
      }
  
}

