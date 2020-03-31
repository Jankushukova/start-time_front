import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-moderator-login',
  templateUrl: './moderator-login.component.html',
  styleUrls: ['./moderator-login.component.css']
})
export class ModeratorLoginComponent implements OnInit {
  loginForm: FormGroup;
  answer: '';

  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private authService: AuthService) {}


  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const user: User = this.loginForm.getRawValue();
    // console.log(this.userService.login(user));
    this.userService.adminLogin(user).subscribe(perf => {
      // @ts-ignore
      this.authService.setToken(perf.access_token);
      // @ts-ignore
      this.userService.setUser(perf.user);
      this.router.navigateByUrl(this.userService.checkRoleUrl());
    }, error => {
      if (error.status === 401) {
        this.answer = error.error.error;
      }
    });
  }

}
