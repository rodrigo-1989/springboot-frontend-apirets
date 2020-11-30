import { Injectable }                 from '@angular/core';
import { DatePipe,formatDate, }        from '@angular/common';
import { Cliente}                     from './cliente';
import { Observable, throwError }     from 'rxjs';
import { HttpClient,HttpHeaders }     from '@angular/common/http';
import { map,catchError,tap }             from 'rxjs/operators';
import Swal                           from 'sweetalert2';
import { Router }                     from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private urlEndPoint:string = 'http://localhost:8080/api/clientes';
  private httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor( private http:HttpClient , private router:Router ) { }
//Metodo para madar a traer los registros de la base de datos
  getClientes():Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndPoint).pipe(
      tap(response=>{
        console.log('ClienteService: tap 1');
        let clientes = response as Cliente[];
          clientes.forEach(cliente =>{
          console.log(cliente.nombre);
        })
      }),
      //En las siguientes lineas solo cambian los nombres a mayusculas
      map( response => {
        let clientes = response as Cliente [];
        return clientes.map( cliente =>{
          cliente.nombre = cliente.nombre.toUpperCase();

          // let datePipe = new DatePipe('es');
          // cliente.createAt = datePipe.transform(cliente.createAt,'EEEE dd, MMMM yyyy');
          // cliente.createAt = formatDate(cliente.createAt,'dd-MM-yyyy','en-US');
          return cliente;
        });
      }),
      tap(response=>{
          console.log('ClienteService: tap 2');
          response.forEach(cliente =>{
          console.log(cliente.nombre);
        })
      }),
    );
  }
  //Metodo con el cual guardamos un nuevo cliente en la base de datos
  create(cliente: Cliente):Observable <Cliente>{
    return this.http.post(this.urlEndPoint, cliente, {headers:this.httpHeaders}).pipe(
      map((response: any)=>response.cliente as Cliente),
      catchError(e =>{
        if (e.status == 400) {
          return throwError(e);
        }
        Swal(e.error.mensaje,e.error.error,"error");
        return throwError(e);
      })
    );
  }

  getCliente(id):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        Swal("Error al editar ",e.error.mensaje,"error");
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente):Observable<any>{
    return this.http.put<any>(`${this.urlEndPoint}/${cliente.id}`, cliente, {headers:this.httpHeaders}).pipe(
      catchError(e =>{
        if (e.status == 400) {
          return throwError(e);
        }
        Swal(e.error.mensaje,e.error.error,"error");
        return throwError(e);
      })
    );
  }

  delete(id: number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`, {headers:this.httpHeaders}).pipe(
      catchError(e =>{
        Swal(e.error.mensaje,e.error.error,"error");
        return throwError(e);
      })
    );
  }
}
