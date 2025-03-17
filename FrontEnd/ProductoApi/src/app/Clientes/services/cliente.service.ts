import { Cliente } from './../interfaces/cliente.interface';
import { ClienteCrearDTO } from './../interfaces/cliente-Crear-dto.interface';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { EMPTY, empty, Observable, of, pipe, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'https://localhost:7221/api/clientes';

  constructor(private http : HttpClient) { }

  obtenerListaCliente() : Observable<Cliente[]>
  { /*Hago la peticion get a la url y genero una lista de los clientes */

    return this.http.get<Cliente[]>(this.apiUrl).pipe(

      map(elemento => elemento.map((clientes)=> ({
        id : clientes.id,
        nombre : clientes.nombre,
        apellido : clientes.apellido,
        email : clientes.email,
        telefono : clientes.telefono
      })),

      catchError((error) => {

        return of([]); /*si salta el error mando un arreglo vacio*/

      })

    ));
  }

  obtenerClientePorId(id: number): Observable<Cliente>
  {

    if (id == 0) {

      return throwError(()=>
        new Error("El id no puede ser 0"));

    }

    let url = `${this.apiUrl}/${id}`;//la url va a tener este formato  url de la api ./ el id que ocupo

    return this.http.get<Cliente>(url).pipe(

      catchError(() => {

        return throwError(()=>
            new Error(' Error a la hora de obtener el cliente seleccionado ') );

      })

    );

  }

  agregarCliente(cliente : FormData) : Observable<Cliente>
  { /*Hago la insercion con un post a la url y genero una lista de los clientes */

    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(//agrego el cliente


      catchError((error) => {
        console.log("error creando", error)
        return throwError(()=>
            new Error(' Error a la hora de agregar el cliente ') ); /*si salta el error mando un  arreglo vacio*/

      })

    );
  }

  actualizarCliente(id : number, cliente : Cliente) : Observable<Cliente>
  {

    if (id == 0) {

      return throwError(()=>
        new Error("El id no puede ser 0"));

    }


    let url = `${this.apiUrl}/${id}`;

    return this.http.put<Cliente>(url, cliente).pipe(/*put actualizo los recursos que existen*/

      catchError(() => {

        return throwError(()=>
            new Error(' Error a la hora de Actualizar el cliente ') ); /*si salta el error mando un arreglo vacio*/

      })

    );

  }

  eliminarCliente(id : number) : Observable<Cliente>
  {
    
    if (id == 0) {

      return throwError(()=>
        new Error("El id no puede ser 0"));

    }

    let url = `${this.apiUrl}/${id}`;

    return this.http.delete<Cliente>(url).pipe(/*elimino el id de la url*/

      catchError(() => {

        return throwError(()=>
            new Error(' Error a la hora de Eliminar el cliente ') ); /*si salta el error mando un arreglo vacio*/

      })

    );

  }

}
