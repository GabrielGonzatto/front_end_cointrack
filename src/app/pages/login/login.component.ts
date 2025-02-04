import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';

import Swal from 'sweetalert2';

import { Usuario } from '../../core/model/usuario/usuario';
import { AppComponent } from '../../app.component';
import { UsuarioService } from '../../core/service/usuario.service';
import { RespostaLogin } from '../../core/model/usuario/DTOs/resposta-login';
import { RespostaExceptionsDTO } from '../../core/model/exceptions/resposta-exceptions-dto';
import { Router } from '@angular/router';
import { AuthService } from '../../core/service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MdbFormsModule, FormsModule, CommonModule, MdbValidationModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  usuario = new Usuario();
  respostaLogin = new RespostaLogin();
  respostaExceptionsDTO = new RespostaExceptionsDTO();

  constructor(
    private app: AppComponent,
    private router: Router,
    private service: UsuarioService,
    private authService: AuthService
  ) {}

  login() {
    if (
      this.app.isEmpty(this.usuario.email) ||
      this.app.isEmpty(this.usuario.senha)
    ) {
      Swal.fire({
        title: 'Preencha todos os campos',
        icon: 'question',
      });
    } else {
      this.service.login(this.usuario).subscribe({
        next: (resposta) => {
          this.respostaLogin = resposta;
          this.authService.setTokem(this.respostaLogin.token);
          
          this.router.navigate(['/home']);
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
