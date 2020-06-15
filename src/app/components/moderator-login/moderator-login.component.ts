import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {SimpleAuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';

@Component({
  selector: 'app-moderator-login',
  templateUrl: './moderator-login.component.html',
  styleUrls: ['./moderator-login.component.css']
})
export class ModeratorLoginComponent implements OnInit {
  loginForm: FormGroup;
  answer = '';

  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private authService: SimpleAuthService) {}


  ngOnInit(): void {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const user: User = this.loginForm.getRawValue();
    this.userService.adminLogin(user).subscribe(perf => {
      console.log('logged');
      this.authService.setToken(perf.token);
      this.userService.setUser(perf.user);
      this.authService.changeAuthorized(true);
      this.router.navigateByUrl('admin');
    }, error => {
      if (error.status === 400) {
        this.answer = 'Password or email is incorrect';
      }
    });
  }

}
