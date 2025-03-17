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
export class ClientesFormComponent implements OnInit {


  clienteFormulario!: FormGroup; /*formbuilder es un servicio que ayuda a la creacion de reactivos en angular ayuda a la crreacion
                                  y administracion de fomrularios, buena opcion para trabajar con formularios grandes*/

  constructor(private form : FormBuilder, private clienteService : ClienteService) {
    this.crearFormulario();
  }

  ngOnInit(): void { /*aqui creo el form en el ngonit*/

    

  }

   /*Aqui inicializo el form con validaciones*/
  crearFormulario(): void {

    this.clienteFormulario = this.form.group({

      nombre: ['', Validators.required],
      apellido : ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]

    });

  }

  /* aqui envio el formulario*/
  enviarFormulario(): void {

    if (this.clienteFormulario.valid) {

      var formulario = new FormData();

      formulario.append("nombre", this.clienteFormulario.get("nombre")?.value)
      formulario.append("apellido", this.clienteFormulario.get("apellido")?.value)
      formulario.append("email", this.clienteFormulario.get("email")?.value)
      formulario.append("telefono", this.clienteFormulario.get("telefono")?.value)

      this.clienteService.agregarCliente(formulario).subscribe({
        
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
