import { Injectable, inject } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { throwError } from 'rxjs';

import { RespostaExceptionsDTO } from '../model/exceptions/resposta-exceptions-dto';
import { RespostaUsuarioDTO } from '../model/usuario/DTOs/resposta-usuario-dto';
import { Usuario } from '../model/usuario/usuario';
import { RespostaLogin } from '../model/usuario/DTOs/resposta-login';
import { AuthService } from './auth.service';
import { EditarUsuarioDTO } from '../model/usuario/DTOs/editar-usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  API = 'http://localhost:8080/cointrack/usuario/';
  token!: string | null;

  respostaExceptionsDTO = new RespostaExceptionsDTO();
  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken();
  }

  login(usuario: Usuario): Observable<RespostaLogin> {
    return this.http
      .post<RespostaLogin>(this.API + 'login', usuario)
      .pipe(catchError(this.handleError));
  }

  cadastrar(usuario: Usuario): Observable<RespostaUsuarioDTO> {
    return this.http
      .post<RespostaUsuarioDTO>(this.API + 'cadastrar', usuario)
      .pipe(catchError(this.handleError));
  }

  editar(usuario: EditarUsuarioDTO): Observable<RespostaUsuarioDTO> {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .put<RespostaUsuarioDTO>(this.API + 'editar', usuario, { headers })
      .pipe(catchError(this.handleError));
  }

  listar(): Observable<RespostaUsuarioDTO> {
    this.token = this.authService.getToken();

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.token}`
    );
    return this.http
      .get<RespostaUsuarioDTO>(this.API + 'listar', { headers })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(() => error.error);
  }
}
