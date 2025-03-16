import { Producto } from './../interfaces/producto.interface';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, throwError } from 'rxjs';
import { ProductoDTO } from '../interfaces/productoCrearDTO.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosServiceService {


  private urlApi = 'http://localhost:7221/api/productos';

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

  obtenerProductoId(id : number): Observable<Producto>
  {

      if (id == 0) {

        return throwError(()=>
          new Error("El id no puede ser 0"));

      }

      let url = `${this.urlApi}/${id}`
      return this.http.get<Producto>(url).pipe(

        catchError(() => {

          return throwError(()=>
              new Error("No se pudo obtener el producto especificado"));///no se necesita try catch porque con el catch error atrapa todas las exepciones

        })

      )
  }

  agregarProducto(producto : ProductoDTO) : Observable<Producto>
    { /*Hago la insercion con un post a la url y genero una lista de los productos */

      return this.http.post<Producto>(this.urlApi, producto).pipe(//agrego el cliente


        catchError(() => {
          return throwError(()=>
              new Error(' Error a la hora de agregar el producto ') ); /*si salta el error mando un  arreglo vacio*/

        })

      );
    }

    actualizarProducto(id : number, producto : Producto) : Observable<Producto>
    {

      if (id == 0) {

        return throwError(()=>
          new Error("El id no puede ser 0"));

      }


      let url = `${this.urlApi}/${id}`;

      return this.http.put<Producto>(url, producto).pipe(/*put actualizo los recursos que existen*/

        catchError(() => {

          return throwError(()=>
              new Error(' Error a la hora de Actualizar el Producto ') );

        })

      );

    }

    eliminarProducto(id : number) : Observable<Producto>
    {

      if (id == 0) {

        return throwError(()=>
          new Error("El id no puede ser 0"));

      }

      let url = `${this.urlApi}/${id}`;

      return this.http.delete<Producto>(url).pipe(/*elimino el id de la url*/

        catchError(() => {

          return throwError(()=>
              new Error(' Error a la hora de Eliminar el producto ') ); /*si salta el error mando un arreglo vacio*/

        })

      );

    }

    obtenerProvedoresPorIDProducto(id : number):Observable<any[]>{

      if (id == 0) {

        return throwError(()=>
          new Error("El id no puede ser 0"));

      }

      let url = `${this.urlApi}/${id}/proveedores`

      return this.http.get<any>(url).pipe(

        catchError(() => {

          return throwError(()=>
              new Error(' Error a la hora de obtener el producto ') ); /*si salta el error mando un arreglo vacio*/

        }

      )

    )}

}
