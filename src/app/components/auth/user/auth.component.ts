import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-unauth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    num = 1;
    authorized = false;
    user: User = null;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isAuthorized()) {
      this.router.navigateByUrl('/start/login');
    }
    jQuery('.dropdown-toggle').on('click', (e) =>  {
      $(this).next().toggle();
    });
    jQuery('.dropdown-menu.keep-open').on('click',  (e) =>  {
      e.stopPropagation();
    });
    this.user =  this.userService.getUser();
  }

  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');

  }
  getDate(){
    const date:Date = new Date();
    return date.getFullYear();
  }

}
