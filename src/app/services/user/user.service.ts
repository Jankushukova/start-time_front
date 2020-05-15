import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user/user';
import {Observable} from 'rxjs';
import {Role} from '../../models/user/role';
import {map} from 'rxjs/operators';
import {ProjectQuestion} from "../../models/project/projectQuestion";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mainUrl = environment.apiUrl + '/api/v1/users';
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
  public login(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user, {responseType: 'json'});
  }
  public logout() {
    localStorage.clear();
    return this.http.post(this.logoutUrl,  {responseType: 'text'});
  }
  public setUser(u: any) {
    const user = new User().deserialize(u);
    // @ts-ignore
    localStorage.setItem('user', JSON.stringify(user));
  }
  public getUser():User {
    return JSON.parse(localStorage.getItem('user'));
  }
  public isAdmin() {
    if (this.getUser()) {
      return this.getUser().role_id.id === 1;
    }
    return false;
  }
  public isDirector() {
    if (this.getUser()) {
      return this.getUser().role_id.id === 2;
    }
    return false;
  }
  public isManager() {
    if (this.getUser()) {
      return this.getUser().role_id.id === 3;
    }
    return false;

  }
  public isAuthorized() {
    if (this.getUser()) {
      return this.getUser().role_id.id === 4;
    }
    return false;
  }
  public checkRoleUrl() {
    if (this.getUser()) {
      const role = this.getUser().role_id.id;
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
  public getProfileInformation(): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}/profile/information`).pipe(
      map(data => new User().deserialize(data)));;
  }


  public findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}/${id}`).pipe(
      map(data => new User().deserialize(data)));;
  }


  public update(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.mainUrl}/${id}`, user);
  }

  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }


  public getPartners(): Observable<User[]> {
    return this.http.get<User[]>( `${this.mainUrl }/partners`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }
//+
}
