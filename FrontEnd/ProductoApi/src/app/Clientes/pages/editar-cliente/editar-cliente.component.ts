import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-editar-cliente',
  standalone: false,
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})

export class EditarClienteComponent implements OnInit {

  clienteFormulario: FormGroup;

  public cliente: Cliente = {
    id: 0,
    nombre: "",
    apellido: "",
    email:"",
    telefono: "",
  }

  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router,
    private activateRoute: ActivatedRoute) {
    
      this.clienteFormulario = this.formBuilder.group({
        clienteId: [0, Validators.required], 
        nombre: ['', Validators.required],
        apellido : ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
  
      });
  }

  ngOnInit(): void {
    
    this.activateRoute.params.subscribe(params => {
      const ID = Number(params["id"]);
      this.clienteService.obtenerClientePorId(ID).subscribe({
        next: (data) => {
          if (data != null){
            this.cliente = data;
            this.clienteFormulario.setValue({ 
              clienteId: data.id, 
              nombre: data.nombre,
              apellido:data.apellido,
              telefono: data.telefono,
              email: data.email,
            });
          }
          else{
            console.log("El cliente no fue encontrado")
          }
        },

        error: (error) => {
          console.error(error);
        }

      });
    });
  }

  enviarFormulario(): void {

    if (this.clienteFormulario.valid) {

      var formulario = new FormData();

      formulario.append("nombre", this.clienteFormulario.get("nombre")?.value)
      formulario.append("apellido", this.clienteFormulario.get("apellido")?.value)
      formulario.append("email", this.clienteFormulario.get("email")?.value)
      formulario.append("telefono", this.clienteFormulario.get("telefono")?.value)

      const clienteID = this.clienteFormulario.get("clienteId")?.value;

      this.clienteService.actualizarCliente(clienteID, formulario).subscribe({
        
        next: () => {//next es un patron reactive y se usa en observables para obtener un valor

            alert(' Se pudo Editar el cliente correctamente ');

            this.router.navigate(["/clientes-list"]);
        },
        error : () => {

          alert(' Error al agregar al cliente, intente una vez mas ')

        }

      });
    }
  }
}
