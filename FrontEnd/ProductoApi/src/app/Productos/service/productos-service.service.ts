import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {


  private urlApi = '';

  constructor(private http : HttpClient) { }


  obtenerListaProductos(){
    
  }

}
