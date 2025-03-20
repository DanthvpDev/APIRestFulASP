import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from '../../interfaces/cliente.interface';

@Component({
  selector: 'app-detalles-cliente',
  standalone: false,
  templateUrl: './detalles-cliente.component.html',
  styleUrl: './detalles-cliente.component.css'
})

export class DetallesClienteComponent implements OnInit {

  public cliente: Cliente = {
    id: 0,
    nombre: "",
    apellido: "",
    email:"",
    telefono: "",
  }

  constructor(private clienteService: ClienteService,
    private activateRoute: ActivatedRoute) {}
  
  ngOnInit(): void {
    
    this.activateRoute.params.subscribe(params => {
      const ID = Number(params["id"]);
      this.clienteService.obtenerClientePorId(ID).subscribe({
        next: (data) => {
          if (data != null){
            this.cliente = data;
          }
          else{
            console.warn("Cliente no se encontró")
          }
        },

        error: (error) => {
          console.error(error);
        }

      });
    });
  }
}
