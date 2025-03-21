import { Cliente } from './../interfaces/cliente.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ClienteDTO } from '../interfaces/cliente-dto';


@Injectable({

  providedIn: 'root'

})

export class ClienteService {

  private apiUrl = 'https://localhost:7221/api/clientes'; // URL de la api del lado del cliente

  constructor(private http : HttpClient) { }// se inyecta el servicio HTTPClient para permitir las peticiones get,post,put,delete

  obtenerListaCliente() : Observable<ClienteDTO[]> //metodo para traer todos los clientes, devuelve un array de CLienteDTO
  { /*Hago la peticion get a la url y genero una lista de los clientes */

    return this.http.get<ClienteDTO[]>(this.apiUrl).pipe(//pipe para permitir encadenar otras cosas

      //elemento representa el array de clientes, el segundo map es para cada cliente
      map(elemento => elemento.map((clientes)=> ({
        //devolver los campos necesarios
        id : clientes.id,
        nombreCompleto : clientes.nombreCompleto,
        email : clientes.email,
        telefono : clientes.telefono

      }))),

      catchError((error) => {

        return of([]); /*si salta el error mando un arreglo vacio*/

      })

    );
  }

  obtenerClientePorId(id: number): Observable<Cliente>// devuelve un Cliente
  {

    if (id == 0) {

      return throwError(()=>
        new Error("El cliente con ese ID no existe"));

    }

    let url = `${this.apiUrl}/${id}`;//la url va a tener este formato  url de la api ./ el id que ocupo

    return this.http.get<Cliente>(url).pipe(// se hace la peticion get, diciendo que va a recibir un cliente

      // error por si ocurre un error en la peticion
      catchError(() => {

        return throwError(()=>
            new Error(' Error a la hora de obtener el cliente seleccionado ') );

      })

    );

  }

  // recibe un cliente en forma de formdata y este metodo devuelve un cliente
  agregarCliente(cliente : FormData) : Observable<Cliente>
  { /*Hago la insercion con un post a la url y genero una lista de los clientes */

    return this.http.post<Cliente>(this.apiUrl, cliente).pipe(//agrego el cliente, el cliente de la url es el que el usuario iongreso


      //error en la peticion
      catchError((error) => {
        console.log("error creando", error)
        return throwError(()=>
            new Error(' Error a la hora de agregar el cliente ') ); /*si salta el error mando un  arreglo vacio*/

      })

    );
  }

  // recibe un ID del cliente que se quiere actualizar, y tambien el cliente nuevo, los datos nuevos
  actualizarCliente(id : number, cliente : FormData) : Observable<Cliente>
  {

    //verifica si el cliente existe
    if (id == 0) {
      return throwError(()=>
        new Error("No hay Cliente"));
    }

    // construccion de la URL
    let url = `${this.apiUrl}/${id}`;
    return this.http.put<Cliente>(url, cliente).pipe(// se actualizan los datos, se le pasa el ciente con los nuevos datos

      // error si algo sale mal en la peticion 
      catchError(() => {

        return throwError(()=>
            new Error(' Error a la hora de Actualizar el cliente ') ); /*si salta el error mando un arreglo vacio*/
      })
    );
  }

  // Recibe el id del cliente que se quiere eliminar
  eliminarCliente(id : number) : Observable<Cliente>
  {
    
    if (id == 0) {

      return throwError(()=>
        new Error("No existe el cliente"));

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
