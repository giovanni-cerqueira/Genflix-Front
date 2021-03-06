import { environment } from './../../environments/environment.prod';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../model/User';
import { UserLogin} from '../model/UserLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


entrar(userLogin: UserLogin): Observable<UserLogin>{
  return this.http.post<UserLogin>('https://genflix.herokuapp.com/usuarios/logar', userLogin)

}

cadastrar(user: User): Observable<User>{
  return this.http.post<User>('https://genflix.herokuapp.com/usuarios/cadastrar', user)

}

getByIdUser(id: number): Observable<User>{
return this.http.get<User>(`https://genflix.herokuapp.com/usuarios/${id}`)
}

alterar(user: User): Observable<User>{
  return this.http.put<User>('https://genflix.herokuapp.com/usuarios/alterar', user)
}

logado(){
  let ok: boolean = false

  if(environment.token != ''){
    ok = true
  }

  return ok
}

adm(){
  let ok: boolean = false

  if(environment.tipo == 'adm'){
    ok = true
  }
  return ok
}

}
