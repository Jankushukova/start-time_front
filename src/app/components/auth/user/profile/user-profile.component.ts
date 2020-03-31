import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  num = 1;
  constructor() { }

  ngOnInit(): void {
  }
  changeClass(element) {
    this.num = element;
  }

}
