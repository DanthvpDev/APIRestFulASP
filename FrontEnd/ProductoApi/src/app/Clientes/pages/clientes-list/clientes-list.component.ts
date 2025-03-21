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

  listaClientes: ClienteDTO[] = [];//lista con todos los cleintes del backend
  listaFiltrada: ClienteDTO [] = [];//lista con filtros 
  buscador : string = "";

  constructor(private clienteService : ClienteService) {}

  ngOnInit(): void { // al cargar la pagina se traen todos los clientes, el resultado se guarda en las dos listas

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

    this.listaFiltrada = this.listaClientes.filter(cliente =>
      
      //diferentes tipos de busquedas
      cliente.nombreCompleto.toLowerCase().includes(this.buscador.toLowerCase()) ||
      cliente.telefono.includes(this.buscador) ||
      cliente.id.toString().includes(this.buscador)     


    );



  }

  eliminarCliente(id : number)
  {
    
    if(id == 0)
    {

      alert("No existe el cliente");
      return;

    }

    if(!confirm("Seguro que quiere eliminar el cliente?"))
    {
      return;
    }

    this.clienteService.eliminarCliente(id).subscribe({
      next: ()=> {
        
        alert("Cliente eliminado correctamente");

        this.listaClientes = this.listaClientes.filter(clientes => clientes.id !== id);// lista todos los clientes con ID diferente al que se acaba de eliminar
        this.listaFiltrada = this.listaClientes;//cargo de nuevo la list sin el eliminado

      },
      error: ()=> {
        
        alert("Cliente no se pudo eliminar correctamente");

      }
    })

  }
}
