import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.css']
})
export class UnauthComponent implements OnInit {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

}
