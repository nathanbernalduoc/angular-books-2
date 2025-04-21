import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  private url = '/libro';
  private libro = {};
  private comentario = {};

  constructor(private http: HttpClient) { }

  getLibroData(): Observable<any> {
    return this.http.get(this.url);
  }

  getLibroDataItem(libroId: number): Observable<any> {
    return this.http.get(this.url+"/"+libroId);
  }

  setLibroData(id: number, nombre:String, categoriaId: number): Observable<any> {

    this.libro = 
      { 
        libroId: id,
        nombre: nombre,
        categoriaId: categoriaId
      }
    console.log("Uri "+this.url);
    console.log("Libro "+JSON.stringify(this.libro));
    return this.http.post(this.url, this.libro);
  }

}
