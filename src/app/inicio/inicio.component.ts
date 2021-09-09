import { AlertasService } from './../service/alertas.service';
import { AuthService } from './../service/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  tituloPost: string
  nomeTema: string
  nomeGenero: string

  listaTemas: Tema[]
  idTema: number
  tema: Tema = new Tema()

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    private temaService: TemaService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {

    if(environment.token == ''){
      alert('Faça o login')
      this.router.navigate(['/entrar'])
    }

    this.getAllTemas()
    this.getAllCriticas()
  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByIdTema(){
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }

  getAllCriticas(){
    this.postagemService.getAllCriticas().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByIdUser(){
    this.authService.getByIdUser(this.idUser).subscribe((resp: User) => {
      this.user = resp
    })
  }

  publicar(){
    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.user.id = this.idUser
    this.postagem.usuario = this.user


    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)
      this.alertas.showAlertSuccess('Postagem realizada com sucesso!')
      this.postagem = new Postagem()
      this.getAllCriticas()
    })

  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllCriticas()
    } else{

    }

    this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByNomeTema(){

    if(this.tituloPost == ''){
      this.getAllTemas()
    } else{
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }

  }

  findByGeneroTema(){
    if(this.tituloPost == ''){
      this.getAllTemas()
    } else {
      this.temaService.getByNomeGenero(this.nomeGenero).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }

}
