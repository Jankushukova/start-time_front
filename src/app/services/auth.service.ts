import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  public setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }
  public getToken(): string {
    return localStorage.getItem(environment.tokenKey);
  }
  public removeToken() {
    localStorage.setItem(environment.tokenKey, '');
  }
  checkAvailability(): boolean {
    const auth = this.getToken();
    return !!auth;
  }
}
