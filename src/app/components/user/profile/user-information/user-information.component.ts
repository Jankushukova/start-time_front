import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../../../../models/user/user';
import {UserService} from '../../../../services/user/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  update = false;
  user: User;
  userForm: FormGroup;
  constructor(
    private userService: UserService,
    private builder: FormBuilder,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,


  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.userForm = this.builder.group({
      firstname: [{value: this.user.firstname, disabled: true}, [Validators.required]],
      lastname: [{value: this.user.lastname, disabled: true}, Validators.required],
      phone_number: [{value: this.user.phone_number, disabled: true}, Validators.required],
      email: [{value: this.user.email, disabled: true}, Validators.required],
      biography: [{value: this.user.biography, disabled: true}, Validators.required],
    });

  }
  edit() {
    this.update = true;

    this.userForm.controls.firstname.enable();
    this.userForm.controls.lastname.enable();
    this.userForm.controls.phone_number.enable();
    if (this.userForm.controls.email.value === ''){
      this.userForm.controls.email.enable();
    }
    this.userForm.controls.biography.enable();
  }
  save() {
    this.update = false;
    this.userForm.controls.firstname.disable();
    this.userForm.controls.lastname.disable();
    this.userForm.controls.phone_number.disable();
    this.userForm.controls.email.disable();
    this.userForm.controls.biography.disable();
    this.checkForm();
    const user: User = this.userForm.getRawValue();
    this.userService.update(user).subscribe(perf => {
    });

  }
  checkForm() {
    if(this.userForm.get('firstname').value === '') this.userForm.controls.firstname.setValue(this.user.firstname);
    if(this.userForm.get('lastname').value === '') this.userForm.controls.lastname.setValue(this.user.lastname);
    if(this.userForm.get('phone_number').value === '') this.userForm.controls.phone_number.setValue(this.user.phone_number);
    if(this.userForm.get('biography').value === '') this.userForm.controls.biography.setValue(this.user.biography);
    if(this.userForm.get('email').value === '') this.userForm.controls.email.setValue(this.user.email);

  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }

}
