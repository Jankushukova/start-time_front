import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {BehaviorSubject} from 'rxjs';
import {Route, Router} from '@angular/router';
// @ts-ignore
import bootbox = require('bootbox');
import {OrdersProduct} from "../models/product/ordersProduct";
import {TranslateService} from "@ngx-translate/core";

@Injectable({
  providedIn: 'root'
})
export class SimpleAuthService {
  private iss = {
    userLogin: environment.apiUrl + '/api/v1/userLogin',
    adminLogin: environment.apiUrl + '/api/v1/adminLogin',
    register: environment.apiUrl + '/api/v1/register',
    emailVerify: environment.apiUrl + '/api/v1/email/verify',
  };
  private authorized = new BehaviorSubject(this.loggedIn(false));
  authorized$ = this.authorized.asObservable();

  changeAuthorized(data: boolean) {
    this.authorized.next(data);
  }
  constructor(
    private router: Router,
    private translator: TranslateService
  ) { }
  handle(token) {
    this.setToken(token);
  }
  public setToken(token: string) {
    localStorage.setItem(environment.tokenKey, token);
  }
  public getToken(): string {
    return localStorage.getItem(environment.tokenKey);
  }
  public removeToken() {
    localStorage.removeItem('token');
  }
  isValid() {
    const token = this.getToken();
    if (token) {
     return true;
    }
  }
  checkAvailability(): boolean {
    const auth = this.getToken();
    return !!auth;
  }
  loggedIn(redirect: boolean) {
    if ( !this.isValid()) {
      if (redirect) {
        this.router.navigateByUrl('/login');
        this.show();
      }
      else return false;
    }

    return true;
  }
  async show() {
    let t = '';
    let m = '';
    this.translator.get('createProject').subscribe(perf => t = perf);
    this.translator.get('messageProject').subscribe(perf => m = perf);
    bootbox.alert({
      title: t,
      message: m,
      size: 'large',
      centerVertical: true,
    });
  }
}
