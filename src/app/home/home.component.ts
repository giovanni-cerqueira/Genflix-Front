import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  foto = environment.foto


  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[]

  fotoPost: string
  tituloPost: string
  nomeTema: string

  idTema: number

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    public authService: AuthService,
    private alertas: AlertasService
  ) { }

  customOptions: any = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

  ngOnInit() {

    this.getAllPostagens()
  }

  getAllPostagens(){
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllPostagens()
    } else{

    }

    this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  publicar(){

    this.user.id = this.idUser
    this.postagem.usuario = this.user


    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)
      this.alertas.showAlertSuccess('Filme realizado com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()
    })

  }

  atualizar(){
    this.postagem.foto = this.fotoPost
    this.postagem.titulo = this.tituloPost

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)
      this.alertas.showAlertSuccess('Filme atualizado com sucesso!')
      this.postagem = new Postagem()
      this.getAllPostagens()

      })
    }
}
