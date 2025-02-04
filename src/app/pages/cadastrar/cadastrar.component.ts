import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';

import Swal from 'sweetalert2';

import { Usuario } from '../../core/model/usuario/usuario';
import { AppComponent } from '../../app.component';
import { UsuarioService } from '../../core/service/usuario.service';
import { RespostaUsuarioDTO } from '../../core/model/usuario/DTOs/resposta-usuario-dto';
import { RespostaExceptionsDTO } from '../../core/model/exceptions/resposta-exceptions-dto';

@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss',
})
export class CadastrarComponent {
  usuario = new Usuario();
  respostaUsuarioDTO = new RespostaUsuarioDTO();
  respostaExceptionsDTO = new RespostaExceptionsDTO();

  constructor(
    private app: AppComponent,
    private router: Router,
    private service: UsuarioService
  ) {}

  cadastrar() {
    if (
      this.app.isEmpty(this.usuario.nome) ||
      this.app.isEmpty(this.usuario.apelido) ||
      this.app.isEmpty(this.usuario.email) ||
      this.app.isEmpty(this.usuario.senha)
    ) {
      Swal.fire({
        title: 'Preencha todos os campos',
        icon: 'question',
      });
    } else {
      this.service.cadastrar(this.usuario).subscribe({
        next: (resposta) => {
          this.respostaUsuarioDTO = resposta;

          this.router.navigate(['/login']);
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
}
