import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  apiUrl = environment.apiUrl + '/api/v1/users';
  loginUrl = environment.apiUrl + '/login';
  constructor(public http: HttpClient) { }
  public findAll() {
    return this.http.get(this.apiUrl);
  }
  public login(user: User) {
    return this.http.post(this.loginUrl, user, {responseType: 'text'});
  }
}
