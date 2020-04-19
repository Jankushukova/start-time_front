import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  answer = '';
  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private authService: AuthService) {}


  ngOnInit(): void {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_number: ['', Validators.required],
    });

  }
  onSubmit() {
    const user: User = this.registerForm.getRawValue();

    this.userService.register(user).subscribe(perf => {
      this.router.navigateByUrl('/user');
    }, error => {
      if (error.status === 400) {
        const message = JSON.parse(error.error);
        if (message.password){
          this.answer = message.password;
        }else{
          this.answer = 'This email has already been taken';
        }
      }
    });;
  }

}
