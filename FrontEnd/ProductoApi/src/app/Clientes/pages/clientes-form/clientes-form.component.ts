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

  constructor(private form : FormBuilder, private clienteService : ClienteService) {}

  ngOnInit(): void { /*aqui creo el form en el ngonit*/

    this.crearFormulario();

  }

   /*Aqui inicializo el form con validaciones*/
  crearFormulario(): void {

    this.clienteFormulario = this.form.group({

      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellido : ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]{8}$')]]

    });

  }

  /* aqui envio el formulario*/
  enviarFormulario(): void {

    if (this.clienteFormulario.valid) {

      let nuevoCliente : ClienteCrearDTO = this.clienteFormulario.value;

      console.log(`nuevo cliente:${nuevoCliente.nombre}`)
      console.log(`nuevo cliente:${nuevoCliente.apellido}`)
      console.log(`nuevo cliente:${nuevoCliente.email}`)
       console.log(`nuevo cliente:${nuevoCliente.telefono}`)
      this.clienteService.agregarCliente(nuevoCliente).pipe(

        catchError(() => {

          return throwError(()=>

            new Error(' Error a la hora de agregar el cliente ')

          );

        })

      ).subscribe({

        next: (nuevoCliente) => {//next es un patron reactive y se usa en observables para obtener un valor

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
