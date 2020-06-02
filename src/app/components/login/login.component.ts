import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SimpleAuthService} from '../../services/auth.service';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  answer = '';
  loading = false;
  private user: SocialUser;
  private loggedIn: boolean;

  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private authService: SimpleAuthService,
              private route: ActivatedRoute,
              private socialAuthService: AuthService
              ) {}
  ngOnInit(): void {
    this.initLoginForm();
    this.handleEmailVerification();
  }
  handleEmailVerification() {
    this.route.queryParams.subscribe(params => {
      if (params.emailConfirmed) {
        this.answer = 'Email successfully verified. Sign in';
      }
      if (params.passwordReset) {
        this.answer = 'Password successfully reset. Sign in';
      }
    });
  }
  initLoginForm() {
    this.loginForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  onSubmit() {
    const user: User = this.loginForm.getRawValue();
    this.loading = true;
    this.userService.login(user).subscribe(perf => {
      this.handleSuccessResponse(perf);
    }, error => {
      if (error.status === 400) {
        this.loading = false;
        this.answer = 'Invalid credentials';
      }
    });
  }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID, {auth_type: 'reauthenticate', scope: 'email', return_scopes: true})
      .then( res => {
        this.userService.facebookAuth(res).subscribe(perf => {
          this.handleSuccessResponse(perf);
        });
    });
    }
    handleSuccessResponse(perf: any) {
      console.log(perf);
      this.authService.handle(perf.token);
      this.userService.setUser(perf.user);
      console.log(this.userService.getUser());
      this.authService.changeAuthorized(true);
      this.router.navigateByUrl('/');
    }

}
