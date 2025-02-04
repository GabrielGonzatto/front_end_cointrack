import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { UsuarioService } from '../../core/service/usuario.service';
import { AuthService } from '../../core/service/auth.service';
import { RespostaUsuarioDTO } from '../../core/model/usuario/DTOs/resposta-usuario-dto';
import { Usuario } from '../../core/model/usuario/usuario';
import { CommonModule, NgIf } from '@angular/common';
import { RespostaExceptionsDTO } from '../../core/model/exceptions/resposta-exceptions-dto';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MdbCollapseModule, MdbDropdownModule, CommonModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  respostaUsuarioDTO = new RespostaUsuarioDTO();
  usuario = new Usuario();
  autenticado!: boolean;

  constructor(
    private service: UsuarioService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.listar().subscribe({
      next: (resposta) => {
        this.autenticado = true;
        this.respostaUsuarioDTO = resposta;
        this.usuario = resposta.usuario;
      },
      error: (error) => {
        this.autenticado = false;
      },
    });
  }

  logout() {
    this.authService.logout();
  }
}
