import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {


  private urlApi = 'https://localhost:4200/api/productos';

  constructor(private http : HttpClient) { }


  obtenerListaProductos(): Observable<Producto[]>
  {
    return this.http.get<Producto[]>(this.urlApi).pipe(
      map(producto => producto.map((productolist)=>({

        nombre : productolist.nombre,
        precio : productolist.precio

      }))),
      catchError(() =>{
        return throwError(()=>
           new Error("Error al lista los productos"));
      })
    );

  }

  

}
