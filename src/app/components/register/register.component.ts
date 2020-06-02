import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {SimpleAuthService} from '../../services/auth.service';
import {User} from '../../models/user/user';
import {MatDialog} from '@angular/material/dialog';
import {EmailConfirmationComponent} from '../email-confirmation/email-confirmation.component';

export const passwordMatchValidator: ValidatorFn = (registerForm: FormGroup): ValidationErrors | null => {
  if (registerForm.get('password').value === registerForm.get('password_confirmation').value)
    return null;
  else
    return {passwordMismatch: true};
};

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  answer = '';
  loading = false;
  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private authService: SimpleAuthService,
              private dialog: MatDialog
              ) {}


  ngOnInit(): void {
    this.initRegisterForm();
  }
  initRegisterForm() {
    this.registerForm = this.builder.group({
      email: ['', [ Validators.required, Validators.email]],
      password: ['', [ Validators.required, Validators.minLength(8)]],
      password_confirmation: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_number: ['', Validators.required],
    }, {validator: passwordMatchValidator});
  }
  get password() { return this.registerForm.get('password'); }
  get password2() { return this.registerForm.get('password_confirmation'); }
  onPasswordInput() {
    if (this.registerForm.hasError('passwordMismatch'))
      this.password2.setErrors([{passwordMismatch: true}]);
    else
      this.password2.setErrors(null);
  }

  onSubmit() {
    this.loading = true;
    const user: User = this.registerForm.getRawValue();

    this.userService.register(user).subscribe(perf => {
        this.openDialog();
        this.router.navigateByUrl('/login');
    }, error => {
      this.loading = false;
      if (error.status === 400) {
        const message = JSON.parse(error.error);
        if (message.password) {
          console.log(message);
          this.answer = message.password;
        } else {
          this.answer = 'This email has already been taken';
        }
      }
    });
  }
  openDialog() {
    this.dialog.open(EmailConfirmationComponent);
  }

}
