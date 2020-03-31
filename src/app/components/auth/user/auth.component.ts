import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {UserService} from '../../../services/user.service';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-unauth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    num = 1;
    authorized = false;
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isAuthorized()) {
      this.router.navigateByUrl('/start/login');
    }
    jQuery('.dropdown-toggle').on('click', function(e)  {
      $(this).next().toggle();
    });
    jQuery('.dropdown-menu.keep-open').on('click',  function(e)  {
      e.stopPropagation();
    });
  }
  changeClass(element) {
    this.num = element;
  }
  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
  }

}
