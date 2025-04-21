import { Component, OnInit } from '@angular/core';
import { LibroService } from '../../services/libro.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-detalle',
  standalone: true,
  imports: [ CommonModule, HttpClientModule ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css',
  providers: [LibroService, HttpClient]
})

export class DetalleComponent implements OnInit {

  libroId: number = 0;
  comentario: any = [];
  libroParam: String = "";
  idNew: number = 0;
  miFormulario!: FormGroup;
  resultado:string = '';
  
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private jsonService: LibroService,
    private activatedRoute: ActivatedRoute) {}
  
  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
        this.libroId = parseInt(params.get("libroId") || "0");
      }
    )

    this.miFormulario = this.fb.group({
      comentarioId: [''],
      libroId: [''],
      usuarioId: [''],
      comentario: ['', Validators.required],
      registroFecha: ['', Validators.required]
    });

  }

  getComentarios() {

    this.jsonService.getLibroDataItem(this.libroId).subscribe(
      valor => {
        console.log("Recuperando libros "+JSON.stringify(valor));
        this.comentario = valor;
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );


  }

  goLibro(): void {
    this.router.navigate(['libro', []]);
  }

  submitForm() {

    console.log(this.comentario.length);
    this.idNew = this.comentario.length ? this.comentario[this.comentario.length-1].id + 1:1;

    console.log('Validando');
    this.comentario = this.miFormulario.get('comentario')!.value;

    let usuarioId: number = 1;

    this.jsonService.setComentarioData(1, this.libroId, usuarioId, this.comentario).subscribe(
      valor => {
        console.log("Feedback inserción libro "+JSON.stringify(valor));
        this.comentario = valor;
        this.getComentarios();
      },
      error => {
        console.log("Se ha producido un error\nApi Recover error: "+error.message+" / "+error.status);
      },
      () => { console.log('Ending!'); } 
    );


  }

}
