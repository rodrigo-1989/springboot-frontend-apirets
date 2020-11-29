import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent  {

    listaCurso: String[]= ['TypeScript','JavaScript','JAva SE','C#','PHP','MongoDB'];
    habilitar: boolean = true;

    setHabilitar(): void {
      this.habilitar = !this.habilitar;
    }

    constructor(){}

}
