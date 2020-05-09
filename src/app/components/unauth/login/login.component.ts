import { Component, OnInit } from '@angular/core';
import {DataService} from '../../../services/data.service';
import {User} from '../../../models/user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {Role} from '../../../models/user/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  answer = '';

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
    this.userService.login(user).subscribe(perf => {
      this.authService.setToken(perf.token);
      console.log(perf.token);
      this.userService.setUser(perf.user);
      this.router.navigateByUrl('user');
    }, error => {
      if (error.status === 400) {
        this.answer = "Invalid credentials";
      }
    });
  }

}
