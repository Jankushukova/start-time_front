import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Role} from '../models/role';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiUrl + '/api/v1/users';
  loginUrl = environment.apiUrl + '/api/v1/userLogin';
  adminLoginUrl = environment.apiUrl + '/api/v1/adminLogin';
  logoutUrl = environment.apiUrl + '/api/v1/logout';
  registerUrl = environment.apiUrl + '/api/v1/register';
  constructor(public http: HttpClient) { }
  public register(user: User): Observable<User> {
    return this.http.post<User>(this.registerUrl, user);
  }
  public adminLogin(user: User) {
    return this.http.post(this.adminLoginUrl, user, {responseType: 'json'});
  }
  public login(user: User) {
    return this.http.post(this.loginUrl, user, {responseType: 'json'});
  }
  public logout() {
    localStorage.clear();
    return this.http.post(this.logoutUrl,  {responseType: 'text'});
  }
  public setUser(u: User) {
   localStorage.setItem('user', JSON.stringify(u));
  }
  public getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
  public isAdmin() {
    if (this.getUser()) {
      return this.getUser().role_id === 1;
    }
    return false;
  }
  public isDirector() {
    if (this.getUser()) {
      return this.getUser().role_id === 2;
    }
    return false;
  }
  public isManager() {
    if (this.getUser()) {
      return this.getUser().role_id === 3;
    }
    return false;
  }
  public isAuthorized() {
    if (this.getUser()) {
      return this.getUser().role_id === 4;
    }
    return false;
  }
  public checkRoleUrl() {
    if (this.getUser()) {
      const role = this.getUser().role_id;
      if ( this.isAdmin()) {
        return '/admin';
      } else if (this.isDirector()) {
        return'/director';
      } else if (this.isManager()) {
        return'/manager';
      } else if (this.isAuthorized()) {
        return'/user';
      }
    }
    return '/start';
  }
}
