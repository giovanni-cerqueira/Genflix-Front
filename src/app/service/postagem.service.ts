import { Postagem } from './../model/Postagem';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PostagemService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllPostagens(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://genflix.herokuapp.com/postagens')
  }

  getAllCriticas(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://genflix.herokuapp.com/postagens/criticas')
  }

  getAllFilmes(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://genflix.herokuapp.com/postagens/filmes')
  }

  getAllSeries(): Observable<Postagem[]>{
    return this.http.get<Postagem[]>('https://genflix.herokuapp.com/postagens/series')
  }

  getByIdPostagem(id: number): Observable<Postagem>{
  return this.http.get<Postagem>(`https://genflix.herokuapp.com/postagens/${id}`)
  }

  getByTituloPostagem(titulo: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://genflix.herokuapp.com/postagens/titulo/${titulo}`)
  }

  getByCriticaPostagem(criticas: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://genflix.herokuapp.com/postagens/criticas/${criticas}`)
  }

  getByFilmePostagem(filme: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://genflix.herokuapp.com/postagens/titulo/${filme}`)
  }

  getBySeriePostagem(series: string): Observable<Postagem[]>{
    return this.http.get<Postagem[]>(`https://genflix.herokuapp.com/postagens/series/${series}`)
  }

  postPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.post<Postagem>('https://genflix.herokuapp.com/postagens', postagem)
  }

  putPostagem(postagem: Postagem): Observable<Postagem>{
    return this.http.put<Postagem>('https://genflix.herokuapp.com/postagens', postagem)
  }

  deletePostagem(id: number){
    return this.http.delete(`https://genflix.herokuapp.com/postagens/${id}`)
  }

  adm(){
    let ok: boolean = false

    if(environment.tipo == 'adm'){
      ok = true
    }
    return ok
  }


}
