import { Component, OnInit }     from '@angular/core';
import { Cliente }               from './cliente';
import { ClienteService }        from './cliente.service';
import { Router,ActivatedRoute } from '@angular/router';
import swal                      from 'sweetalert2'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente:Cliente = new Cliente();
  public titulo:string ='Crear un nuevo cliente';

  constructor(private clienteService:ClienteService,
              private router:Router,
              private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarCliente();
  }
  cargarCliente():void {
    this.activatedRoute.params.subscribe(params =>{
      let id =params['id'];
      if(id){
        this.clienteService.getCliente(id).subscribe( (cliente)=> this.cliente = cliente)
      }
    })
  }

  create():void {
    this.clienteService.create(this.cliente).subscribe(
          cliente =>{
           this.router.navigate([`/clientes`])
           swal('Nuevo cliente',`El cliente ${ cliente.nombre } a sido creado con exito `,'success')
    })
  }
  update():void {
    this.clienteService.update(this.cliente).subscribe(json=>{
      this.router.navigate([`/clientes`])
      swal('Actualización',`${ json.mensaje }: ${ json.cliente.nombre } `,'success')
    })
  }


}
