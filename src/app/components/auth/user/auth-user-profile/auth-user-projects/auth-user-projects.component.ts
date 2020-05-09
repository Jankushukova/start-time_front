import { Component, OnInit } from '@angular/core';
import {User} from "../../../../../models/user/user";

@Component({
  selector: 'app-auth-user-projects',
  templateUrl: './auth-user-projects.component.html',
  styleUrls: ['./auth-user-projects.component.css']
})
export class AuthUserProjectsComponent implements OnInit {
  user:User;
  constructor() { }

  ngOnInit(): void {
  }

  someFunction(data){
    this.user = data;

  }
}
