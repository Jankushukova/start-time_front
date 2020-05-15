import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {User} from "../../../../../models/user/user";
import {UserService} from "../../../../../services/user/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-user-information',
  templateUrl: './user-information.component.html',
  styleUrls: ['./user-information.component.css']
})
export class UserInformationComponent implements OnInit {
  update = false;
  user:User;
  userForm:FormGroup;
  constructor(
    private userService:UserService,
    private builder: FormBuilder,
    private _snackBar: MatSnackBar,


  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    console.log(this.user);
    this.userForm = this.builder.group({
      firstname: [{value:this.user.firstname, disabled:true}, [Validators.required]],
      lastname: [{value: this.user.lastname, disabled:true}, Validators.required],
      phone_number: [{value:this.user.phone_number,disabled:true}, Validators.required],
      email: [{value:this.user.email,disabled:true}, Validators.required],
      biography: [{value:this.user.biography,disabled:true}, Validators.required],
    });

  }
  edit(){
    console.log("edit");
    this.update=true;

    this.userForm.controls['firstname'].enable();
    this.userForm.controls['lastname'].enable();
    this.userForm.controls['phone_number'].enable();
    this.userForm.controls['email'].enable();
    this.userForm.controls['biography'].enable();
  }
  save(){
    this.update=false;
    this.userForm.controls['firstname'].disable();
    this.userForm.controls['lastname'].disable();
    this.userForm.controls['phone_number'].disable();
    this.userForm.controls['email'].disable();
    this.userForm.controls['biography'].disable();
    this.openSnackBar('Request was sent to moderator', 'Close', 'style-success');

  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition:'right',
    });
  }

}
