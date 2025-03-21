import { ClienteCrearDTO } from './../../interfaces/cliente-Crear-dto.interface';
import { Cliente } from './../../interfaces/cliente.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , ReactiveFormsModule } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { catchError, throwError } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({

  selector: 'app-clientes-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.css']

})
export class ClientesFormComponent implements OnInit { // declaracion de la clase


  clienteFormulario!: FormGroup; //variable que contiene la estructura del fomruilario con los datos, el signo es para indicar que se va a inicializar despues

  // se inyectan el formBuilder para el formulario, servicioo para enviar los datos
  constructor(private form : FormBuilder, private clienteService : ClienteService) {
    this.crearFormulario();
  }

  ngOnInit(): void { } //vacio porque ya se inicializo el formulario en el constructor
  

  /*Aqui inicializo el form con validaciones*/
  crearFormulario(): void {

    this.clienteFormulario = this.form.group({

      // se inicia cada campo del formulario en vacio y con sus validaciones
      nombre: ['', Validators.required],
      apellido : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]

    });

  }

  /* aqui envio el formulario*/
  enviarFormulario(): void {

    // se verifica que los datos del formulario sean validos antes de enviar
    if (this.clienteFormulario.valid) {

      var formulario = new FormData();// se crea una instancia de formdata para enviar los datos al Back

      // esto lo que hace es extraer los valores de cada campo del formuilario y los agreda a la variable de formdata con el mismo nombre que espera el backend
      formulario.append("nombre", this.clienteFormulario.get("nombre")?.value)
      formulario.append("apellido", this.clienteFormulario.get("apellido")?.value)
      formulario.append("email", this.clienteFormulario.get("email")?.value)
      formulario.append("telefono", this.clienteFormulario.get("telefono")?.value)

      this.clienteService.agregarCliente(formulario).subscribe({ // se llama al metodo del servicio para agregar el cliente y se le pasa el formulario recien creado
        
        next: () => {//next es un patron reactive y se usa en observables para obtener un valor

            alert(' Se pudo crear el cliente correctamente ');

            this.clienteFormulario.reset();//borro tpdo los datos que se ingreso en el form

        },
        error : () => {

          alert(' Error al agregar al cliente, intente una vez mas ')

        }

      });
    }
  }
}
