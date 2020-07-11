import { Component, OnInit } from '@angular/core';
import {User} from '../../models/user/user';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SimpleAuthService} from '../../services/auth.service';
import {AuthService, FacebookLoginProvider, GoogleLoginProvider, SocialUser} from 'angularx-social-login';
import {TranslateService} from "@ngx-translate/core";
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
              private socialAuthService: AuthService,
              private translate: TranslateService
              ) {}
  ngOnInit(): void {
    this.initLoginForm();
    this.handleEmailVerification();
  }
  handleEmailVerification() {
    this.route.queryParams.subscribe(params => {
      if (params.emailConfirmed) {
        this.translate.get('authorization.password_reset.success_email')
          .subscribe(perf => {
            this.answer = perf;
          });
      }
      if (params.passwordReset) {
        this.translate.get('authorization.password_reset.success_password')
          .subscribe(perf => {
            this.answer = perf;
          });
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
      this.loading = false;
      if (error.status === 400) {
        this.translate.get('authorization.login.invalid_credentials')
          .subscribe(perf => {
            this.answer = perf;
          });
      } else {
        alert('internal server error');
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
      this.authService.handle(perf.token);
      this.userService.setUser(perf.user);
      this.authService.changeAuthorized(true);
      this.router.navigateByUrl('/');
    }

}
