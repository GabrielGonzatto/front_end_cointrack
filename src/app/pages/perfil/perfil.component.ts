import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AppComponent } from '../../app.component';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import { EditarUsuarioDTO } from '../../core/model/usuario/DTOs/editar-usuario-dto';
import { UsuarioService } from '../../core/service/usuario.service';
import { RespostaUsuarioDTO } from '../../core/model/usuario/DTOs/resposta-usuario-dto';
import { RespostaExceptionsDTO } from '../../core/model/exceptions/resposta-exceptions-dto';

import Swal from 'sweetalert2';
import { Usuario } from '../../core/model/usuario/usuario';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NavbarComponent, MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.scss',
})
export class PerfilComponent {
  usuario = new EditarUsuarioDTO();
  respostaUsuarioDTO = new RespostaUsuarioDTO();
  respostaExceptionsDTO = new RespostaExceptionsDTO();

  constructor(
    private service: UsuarioService,
    private app: AppComponent,
    private router: Router,
    private authService: AuthService
  ) {
    this.listar();
  }

  editar() {
    if (
      this.app.isEmpty(this.usuario.nome) ||
      this.app.isEmpty(this.usuario.apelido) ||
      this.app.isEmpty(this.usuario.senha)
    ) {
      Swal.fire({
        title: 'Preencha todos os campos',
        icon: 'question',
      });
    } else {
      if (this.app.isEmpty(this.usuario.novaSenha)) {
        this.usuario.novaSenha = null;
      }

      this.service.editar(this.usuario).subscribe({
        next: (resposta) => {
          this.respostaUsuarioDTO = resposta;
          this.listar();

          if (resposta.statusCode == 200) {
            Swal.fire({
              title: this.respostaUsuarioDTO.mensagem,
              icon: 'success',
            });
          } else {
            Swal.fire({
              title: this.respostaUsuarioDTO.mensagem,
              icon: 'error',
            });
          }
        },
        error: (error) => {
          this.respostaExceptionsDTO = error;

          Swal.fire({
            title: this.respostaExceptionsDTO.mensagem,
            icon: 'error',
          });
        },
      });
    }
  }

  listar() {
    this.service.listar().subscribe({
      next: (resposta) => {
        this.respostaUsuarioDTO = resposta;

        this.usuario.nome = resposta.usuario.nome;
        this.usuario.apelido = resposta.usuario.apelido;
        this.usuario.senha = '';
        this.usuario.novaSenha = '';
      },
      error: (error) => {
        this.authService.logout();
      },
    });
  }
}
