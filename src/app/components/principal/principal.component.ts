import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { HttpTestingController } from '@angular/common/http/testing';
import { LibroService } from '../../services/libro.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-principal',
  standalone: true,
  imports: [ CommonModule , ReactiveFormsModule, HttpClientModule],
  templateUrl: './principal.component.html',
  styleUrl: './principal.component.css',
  providers: [LibroService, HttpClient]
})

export class PrincipalComponent implements OnInit {

  resultado:string = '';
  titulo = 'Libro';
  libro: any[] = []; // {} objeto | [] array
  inventario: any[] = []; // {} objeto | [] array
  nombre: String = "";
  categoriaId: number = 0;
  idNew: number = 0;

  miFormulario!: FormGroup;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private jsonService: LibroService,
  ) {
    this.getLibro();
  }

  ngOnInit(): void {

    console.log('libros no recuperada '+JSON.stringify(this.libro));

    this.miFormulario = this.fb.group({
      libroId: [''],
      nombre: ['', Validators.required],
      categoriaId: ['', Validators.required]
    });

  }


  getLibro() {

    this.jsonService.getLibroData().subscribe(
      valor => {
        console.log("Recuperando libros "+JSON.stringify(valor));
        this.libro = valor;
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );

  }

  goDetalle(libroId:string): void {
    console.log('Hola '+libroId);
    this.router.navigate(['detalle', {libroId: libroId}]);
  }

  submitForm() {
    console.log(this.libro.length);
    this.idNew = this.libro.length ? this.libro[this.libro.length-1].id + 1:1;

    console.log('Validando');
    this.nombre = this.miFormulario.get('nombre')!.value;
    this.categoriaId = this.miFormulario.get('categoriaId')!.value;

    this.jsonService.setLibroData(this.idNew, this.nombre, this.categoriaId).subscribe(
      valor => {
        console.log("Feedback inserción libro "+JSON.stringify(valor));
        this.libro = valor;
        this.getLibro();
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );


  }

}
