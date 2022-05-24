import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { User } from '../model/User';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

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

  listaTemas: Tema[]
  tema: Tema = new Tema()
  nomeGenero: string
  tituloSerie: string

  idTema: number

  user: User = new User()
  idUser = environment.id

  key = 'data'
  reverse = true

  constructor(
    private router: Router,
    private postagemService: PostagemService,
    public authService: AuthService,
    private alertas: AlertasService,
    private temaService: TemaService
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
        items: 9
      }
    },
    nav: true
  }

  ngOnInit() {

    this.getAllFilmes()
    this.getAllSeries()
    this.getAllTemas()
  }

  getAllFilmes(){
    this.postagemService.getAllFilmes().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })

  }

  getAllSeries(){
    this.postagemService.getAllSeries().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })

  }

  getAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  findByTituloPostagem(){

    if(this.tituloPost == ''){
      this.getAllFilmes()
    } else{

    }

    this.postagemService.getByTituloPostagem(this.tituloPost).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  findByTituloSerie(){
    if(this.tituloSerie == ''){
      this.getAllSeries()
    } else{
    this.postagemService.getBySeriePostagem(this.tituloSerie).subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }
}

  publicar(){

    this.user.id = this.idUser
    this.postagem.usuario = this.user


    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      console.log(this.postagem)

      this.postagem = new Postagem()
      this.getAllFilmes()
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
      this.getAllFilmes()

      })
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

    findByIdTema(){
      this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => {
        this.tema = resp
      })
    }
}
