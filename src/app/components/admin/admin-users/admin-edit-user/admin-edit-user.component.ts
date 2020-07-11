import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../models/user/user";
import {UserService} from "../../../../services/user/user.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-admin-edit-user',
  templateUrl: './admin-edit-user.component.html',
  styleUrls: ['./admin-edit-user.component.css']
})
export class AdminEditUserComponent implements OnInit {
  userForm: FormGroup;
  user: User;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private builder: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.findById(this.data.userId).subscribe(perf => {
      this.user = perf;
      this.initUserForm();

    });

  }

  initUserForm() {
    this.userForm = this.builder.group({
      firstname: [ (this.user.firstname) ? this.user.firstname : '', Validators.required],
      lastname: [(this.user.lastname) ? this.user.lastname : '', Validators.required],
      phone_number: [(this.user.phone_number) ? this.user.phone_number : '', Validators.required],
    });
  }
  onSubmit() {
    const oldUser = this.user;
    this.user.firstname = this.userForm.controls.firstname.value;
    this.user.lastname = this.userForm.controls.lastname.value;
    this.user.phone_number = this.userForm.controls.phone_number.value;
    this.userService.adminUpdate(this.user).subscribe(perf => {
      let users: User[] = [];
      this.userService.users$.subscribe(res => {
        users = res;
      });
      users = users.map( data => {
        if (data.id === this.user.id) {
          data = this.user;
        }
        return data;
      });
      users.push(this.user);
      this.userService.changeUsers(users);
    });
  }


}
