import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from "@ngx-translate/core";

export const passwordMatchValidator: ValidatorFn = (registerForm: FormGroup): ValidationErrors | null => {
  if (registerForm.get('password').value === registerForm.get('password_confirmation').value) {
    return null;
  }
  else {
    return {passwordMismatch: true};
  }
};

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  answer = '';
  loading = false;
  resetPasswordRequestForm: FormGroup;
  resetPasswordResponseForm: FormGroup;
  token = '';
  constructor(private builder: FormBuilder,
              private userService: UserService,
              private route: ActivatedRoute,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private router: Router,
              private translate: TranslateService
              ) { }

  ngOnInit(): void {
    this.resetPasswordRequestForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
    });
    this.resetPasswordResponseForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      resetToken: [''],

    }, { validator: passwordMatchValidator});
    this.route.queryParams.subscribe(params => {
      if (params.token) {
        this.token = params.token;
      }
    });
  }

  onSubmitRequest() {
    this.userService.sendResetPasswordLink(this.resetPasswordRequestForm.controls.email.value).subscribe(perf => {
      this.translate.get('authorization.password_reset.email_check_message')
        .subscribe(perf2 => {
          this.openSnackBar(perf2, 'Close', 'style-success');
        });
      this.router.navigateByUrl('/login');
    }, error => {
      if (error.status === 404) {
        this.translate.get('authorization.password_reset.invalid_credentials')
          .subscribe(perf => {
            this.answer = perf;
          });
      }
    });
  }
  get password() { return this.resetPasswordResponseForm.get('password'); }
  get password2() { return this.resetPasswordResponseForm.get('password_confirmation'); }
  onPasswordInput() {
    if (this.resetPasswordResponseForm.hasError('passwordMismatch')) {
      this.password2.setErrors([{passwordMismatch: true}]);
    } else {
      this.password2.setErrors(null);
    }
  }
  onSubmitResponse() {
    this.resetPasswordResponseForm.value.resetToken = this.token;
    this.userService.changePassword(this.resetPasswordResponseForm.value).subscribe(perf => {
      this.openSnackBar(perf.data, 'Close', 'style-success');
      this.router.navigateByUrl('/login');
    }, error => {
      this.translate.get('authorization.password_reset.failure_message')
        .subscribe(perf2 => {
          this.openSnackBar(perf2, 'Close', 'style-error');
        });
    });
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
