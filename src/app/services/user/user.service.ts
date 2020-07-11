import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Role} from '../../models/user/role';
import {map} from 'rxjs/operators';
import {ProjectQuestion} from '../../models/project/projectQuestion';
import {SimpleAuthService} from '../auth.service';
import {Router} from '@angular/router';
import {SocialUser} from 'angularx-social-login';
import {Project} from '../../models/project/project';
import {CommentLike} from "../../models/commentLike";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  mainUrl = environment.apiUrl + '/api/v1/users';
  customUrl = environment.apiUrl + '/api/v1';
  loginUrl = environment.apiUrl + '/api/v1/userLogin';
  adminLoginUrl = environment.apiUrl + '/api/v1/adminLogin';
  logoutUrl = environment.apiUrl + '/api/v1/logout';
  registerUrl = environment.apiUrl + '/api/v1/register';
  private users = new BehaviorSubject([]);
  users$ = this.users.asObservable();
  private partners = new BehaviorSubject([]);
  partners$ = this.partners.asObservable();
  changeUsers(data: User[]) {
    this.users.next(data);
  }
  changePartners(data: any[]) {
    this.partners.next(data);
  }
  constructor(public http: HttpClient,
              private authService: SimpleAuthService,
              private router: Router
              ) { }
  public register(user: User): Observable<any> {
    return this.http.post<User>(this.registerUrl, user);
  }
  public adminLogin(user: User): Observable<any> {
    return this.http.post(this.adminLoginUrl, user, {responseType: 'json'});
  }

  public login(user: User): Observable<any> {
    return this.http.post(this.loginUrl, user, {responseType: 'json'});
  }

  public facebookAuth(user: SocialUser): Observable<any> {
    return this.http.post(`${this.customUrl}/auth/facebook`, user, {responseType: 'json'});
  }
  public sendResetPasswordLink(userEmail: string): Observable<any> {
    return this.http.post(`${this.customUrl}/send/reset/password/link`, { email: userEmail}
  );
  }
  public changePassword(data: any): Observable<any> {
      return this.http.post<any>(`${this.customUrl}/change/password`, data);
  }
  public logout() {
    this.authService.removeToken();
    localStorage.clear();
    this.authService.changeAuthorized(false);
    this.router.navigateByUrl(this.checkRoleUrl());
    return this.http.post(this.logoutUrl,  {responseType: 'text'});
  }
  public setUser(u: any) {
    const user = new User().deserialize(u);
    // @ts-ignore
    localStorage.setItem('user', JSON.stringify(user));
  }
  public getUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }
  public isAdmin() {
    if (this.authService.loggedIn(false)) {
      return this.getUser().role.id === 1;
    }
    return false;
  }
  public isDirector() {
    if (this.authService.loggedIn(false)) {
      return this.getUser().role.id === 2;
    }
    return false;
  }
  public isManager() {
    if (this.authService.loggedIn(false)) {
      return this.getUser().role.id === 3;
    }
    return false;
  }
  public isAuthorized() {
    if (this.authService.loggedIn(false)) {
      return this.getUser().role.id === 4;
    }
    return false;
  }
  public checkRoleUrl() {
    if (this.getUser()) {
      if ( this.isAdmin()) {
        return '/admin';
      } else if (this.isAuthorized()) {
        return'/user';
      }
    } else {
      if (this.isAdmin()) {
        return '/start-time/moderator';
      }
    }
  }
  public getProfileInformation(): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}/profile/information`).pipe(
      map(data => new User().deserialize(data)));
  }


  public findById(id: number): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}/${id}`).pipe(
      map(data => new User().deserialize(data)));
  }


  public update(user: User): Observable<User> {
    return this.http.put<User>(`${this.mainUrl}/update`, user);
  }
  public adminUpdate(user: User): Observable<User> {
    return this.http.put<User>(`${this.mainUrl}/update/admin`, user);
  }

  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }

  // +
  public createPartner(partner: any): Observable<any> {
    return this.http.post<any>(this.mainUrl + '/partner', partner);
  }

  // +
  public deletePartner(id: number): Observable<any> {
    return this.http.delete<any>(`${this.mainUrl}/partner/${id}`);
  }


  public getAll(perPageCount: number, pageCount: number): Observable<User[]> {
    return this.http.get<User[]>( `${this.mainUrl }/all`,
      {
        // @ts-ignore
        params: {
          perPage: perPageCount,
          page: pageCount
        }
      });
  }
  public getAllPartners(): Observable<any[]> {
    return this.http.get<any[]>( `${this.mainUrl }/partner/all`);
  }
  // +
  public getRecommendationsOfUser(perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/recommendations`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }

  // +
  public filterUsers(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<any[]> {
    return this.http.get<User[]>(`${this.mainUrl}/filter`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }
}
