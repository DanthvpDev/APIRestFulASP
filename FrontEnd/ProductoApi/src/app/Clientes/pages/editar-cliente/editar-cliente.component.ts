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

  clienteFormulario: FormGroup; // para almacenar el formulario reactivo

// Variable que se usará para almacenar los datos del cliente cargados desde el backend, los datos qeu se quieren cambiar
public cliente: Cliente = {
    id: 0,
    nombre: "",
    apellido: "",
    email:"",
    telefono: "",
  }

  //formbuidel para el formulario, ruouter para redirigir a otra vista, activate route para leer el parametro de la url en este caso el ID del cliente 
  constructor(private formBuilder: FormBuilder, private clienteService: ClienteService, private router: Router,
    private activateRoute: ActivatedRoute) {
    
      // se crea el formulario con el id en 0 y sus campos en vacio 
      this.clienteFormulario = this.formBuilder.group({
        clienteId: [0, Validators.required], 
        nombre: ['', Validators.required],
        apellido : ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]
  
      });
  }

  ngOnInit(): void {
    //acceso a la ruta del navegador cuando angular detecte los paremetros ejecuta esto
    this.activateRoute.params.subscribe(params => {
      const ID = Number(params["id"]);// se extrae el valor del aprametro y se convierte a numero para guardarlo en la CONSTANTE
      this.clienteService.obtenerClientePorId(ID).subscribe({// se obtiene el cliente que tenga ese ID
        next: (data) => {
          if (data != null){ // si se encuentra el cliente, se llena el formulario con los datos del cliente que viene del backend
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

    if (this.clienteFormulario.valid) { // si los datos del formulario son validos, continua 

      var formulario = new FormData();

            // esto lo que hace es extraer los valores de cada campo del formuilario y los agreda a la variable de formdata con el mismo nombre que espera el backend
      formulario.append("nombre", this.clienteFormulario.get("nombre")?.value)
      formulario.append("apellido", this.clienteFormulario.get("apellido")?.value)
      formulario.append("email", this.clienteFormulario.get("email")?.value)
      formulario.append("telefono", this.clienteFormulario.get("telefono")?.value)

      // lo que hace es tomar o traer el ID del cliente que se está editando 
      const clienteID = this.clienteFormulario.get("clienteId")?.value;

      // se llama a metodo del servicio para actalizar, el ID del cliente que tiene que actualizar y el fomrulario con los datos nuevos
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
