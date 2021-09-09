import { User } from './../model/User';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: User = new User
  confirmarSenha: string
  tipoUsuario: string

  verificador = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

  }

  confirmSenha(event: any) {
    this.confirmarSenha = event.target.value
  }

  tipoUser(event: any){
    this.tipoUsuario = event.target.value
  }

  cadastrar(){
    this.user.tipo = this.tipoUsuario
    console.log(this.user)

    if(this.user.senha != this.confirmarSenha) {
      alert('As senhas estão incorretas')

    } else {
      this.authService.cadastrar(this.user).subscribe((resp: User) => {
        this.user = resp
        console.log(this.user)
        this.router.navigate(['/entrar'])
        alert('Usuário cadastrado com sucesso!')
      })

    }

    if (this.verificador.test(this.user.foto)) {
      this.user.foto = this.user.foto
    }
    else {
      this.user.foto = "https://imgur.com/T1NhiS6"
    }

  }

}
