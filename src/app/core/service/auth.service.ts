import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token_key = 'Token';

  constructor (private router: Router) { }

  setTokem (token: string) {
    sessionStorage.setItem(this.token_key, token);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.token_key);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.token_key);
  }

  logout(): void {
    sessionStorage.removeItem(this.token_key);
    this.router.navigate(['/login']);
  }
}
