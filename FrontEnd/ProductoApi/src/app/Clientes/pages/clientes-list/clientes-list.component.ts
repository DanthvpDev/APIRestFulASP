import { Component, OnInit } from '@angular/core';
import { Cliente } from '../../interfaces/cliente.interface';
import { ClienteService } from '../../services/cliente.service';

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {

  listaClientes: Cliente[] = [];

  constructor(private clienteService : ClienteService) {}

  ngOnInit(): void {

    this.clienteService.obtenerListaCliente()
    .subscribe(

      data => {

        this.listaClientes = data;

      }

    );
  }



}
