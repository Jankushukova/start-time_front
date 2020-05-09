import { Component, OnInit } from '@angular/core';
import {User} from "../../../../../models/user/user";

@Component({
  selector: 'app-auth-user-infromation',
  templateUrl: './auth-user-infromation.component.html',
  styleUrls: ['./auth-user-infromation.component.css']
})
export class AuthUserInfromationComponent implements OnInit {
  user:User;
  constructor() { }

  ngOnInit(): void {
  }
  someFunction(data){
    this.user = data;

  }
}
