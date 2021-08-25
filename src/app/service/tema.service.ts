import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllTema(): Observable<Tema[]>{
    return this.http.get<Tema[]>('https://blogdogio.herokuapp.com/temas')
  }

  getByIdTema(id: number): Observable<Tema>{
    return this.http.get<Tema>(`https://blogdogio.herokuapp.com/temas/${id}`)
  }

  getByNomeTema(nome: string): Observable<Tema[]>{
  return this.http.get<Tema[]>(`https://blogdogio.herokuapp.com/temas/descricao/${nome}`)
  }

  postTema(tema: Tema): Observable<Tema>{
    return this.http.post<Tema>('https://blogdogio.herokuapp.com/temas', tema)
  }

  putTema(tema: Tema): Observable<Tema>{
    return this.http.put<Tema>('https://blogdogio.herokuapp.com/temas', tema)
  }

  deleteTema(id: number) {
    return this.http.delete(`https://blogdogio.herokuapp.com/temas/${id}`)
  }
}
