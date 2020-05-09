import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router
              ) { }

  ngOnInit(): void {
    if (!this.userService.isAdmin()) {
      this.router.navigateByUrl('/start/login');
    }else{
      jQuery('.dropdown-toggle').on('click', function (e) {
        $(this).next().toggle();
      });
      jQuery('.dropdown-menu.keep-open').on('click', function (e) {
        e.stopPropagation();
      });
    }

  }
  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

}
