import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDTO } from '../../interfaces/cliente-dto';

@Component({
  selector: 'app-clientes-list',
  standalone: false,
  templateUrl: './clientes-list.component.html',
  styleUrl: './clientes-list.component.css'
})
export class ClientesListComponent implements OnInit {

  listaClientes: ClienteDTO[] = [];//lista original
  listaFiltrada: ClienteDTO [] = [];//lista filtrada
  buscador : string = "";

  constructor(private clienteService : ClienteService) {}

  ngOnInit(): void {

    this.clienteService.obtenerListaCliente()
    .subscribe(

      data => {
        
        console.log("Clientes recibidos:", data);
        this.listaClientes = data;
        this.listaFiltrada = data;

      }

    );
  }

  filtrarClientes(){

    if(this.listaClientes.length == 0)
    {

      alert("No posee clientes en la lista");
      return;

    }

    if (this.buscador.trim() == "")
    {

      alert("El buscador esta vacio, no se pude buscar nada, Ingrese la manera que desea buscar al cliente (Nombre, apellido, telefono o id)");
      this.listaFiltrada = this.listaClientes; // pongo la lista original de los clientes porque sino queda vacia la lista

      return;

    }

    this.listaFiltrada = this.listaClientes.filter(cliente =>
      
      //diferentes tipos de busquedas
      cliente.nombreCompleto.toLowerCase().includes(this.buscador.toLowerCase()) ||
      cliente.telefono.toLowerCase().includes(this.buscador.toLowerCase()) ||
      cliente.id.toString().includes(this.buscador)     


    );



  }

  eliminarCliente(id : number)
  {
    
    if(id == 0)
    {

      alert("El id no puede ser igual a 0");
      return;

    }

    if(!confirm("Seguro que quiere eliminar el estudiante?"))
    {
      return;
    }

    this.clienteService.eliminarCliente(id).subscribe({
      next: ()=> {
        

        alert("Cliente eliminado correctamente");

        this.listaClientes = this.listaClientes.filter(clientes => clientes.id !== id);//hago un filter de todos los clientes  menos el que se acaba de eliminar
        this.listaFiltrada = this.listaClientes;//cargo de nuevo la list sin el eliminado

      },
      error: ()=> {
        
        alert("Cliente no se pudo eliminar correctamente");

      }
    })

  }
}
