import { Component, OnInit } from '@angular/core';
import { Cliente}            from './cliente';
import { ClienteService }    from './cliente.service';
import swal                  from 'sweetalert2';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent implements OnInit {

  clientes:Cliente[];
  constructor(private clienteService:ClienteService) { }

  ngOnInit(): void {
    this.clienteService.getClientes().subscribe(
      clientes => this.clientes = clientes
    );
  }
  delete(cliente: Cliente):void{
    swal ({
      title:'Alerta',
      text:`¿Seguro que quieres eliminar a ${cliente.nombre}?`,
      type:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085d6',
      cancelButtonColor:'#d33',
      confirmButtonText:'si, eliminar',
      cancelButtonText:'NO, cancelar',
      confirmButtonClass:'btn btn-succes',
      cancelButtonClass:'btn btn-danger',
      buttonsStyling:false,
      reverseButtons:true

    }).then((result)=>{
      if(result.value){
        this.clienteService.delete(cliente.id).subscribe( response =>{
          this.clientes = this.clientes.filter( cli => cli !== cliente )
          swal('Eliminado',`${cliente.nombre} fue eliminado :(`,'success')
        })

      }
    })
  }

}
