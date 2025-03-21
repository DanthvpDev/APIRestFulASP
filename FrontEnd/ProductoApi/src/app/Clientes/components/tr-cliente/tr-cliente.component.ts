import { Component, Input } from '@angular/core';
import { ClienteDTO } from '../../interfaces/cliente-dto';

@Component({
  selector: 'app-tr-cliente',
  standalone: false,
  templateUrl: './tr-cliente.component.html',
  styleUrl: './tr-cliente.component.css'
})
export class TrClienteComponent {

  @Input()
  public cliente! : ClienteDTO;



}
