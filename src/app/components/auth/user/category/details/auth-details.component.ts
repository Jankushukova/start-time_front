import { Component, OnInit } from '@angular/core';
import * as bootbox from 'bootbox';
@Component({
  selector: 'app-details',
  templateUrl: './auth-details.component.html',
  styleUrls: ['./auth-details.component.css']
})
export class AuthDetailsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  show() {
   bootbox.alert('hello word');
  }

}
