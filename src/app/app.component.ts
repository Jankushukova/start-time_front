import {Component, OnInit} from '@angular/core';
import {DataService} from './services/data.service';
import {Router} from '@angular/router';
import {UserService} from './services/user/user.service';
import {Role} from './models/user/role';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'st';
  hobby = '';
  deleted = ['red', 'green', 'blue'];
  i = -1;
  numbers: number[] = [];
  hobbies: string[] = [];
  constructor(private router: Router, private dataService: DataService, private userService: UserService) {}
  ngOnInit(): void {
  }
   deleteHobby(index) {
    this.hobbies.splice(index, 1);
    this.i < 3 ? this.i++ : this.i = 0;
  }
  checkEnter(event) {
    if (event.key === 'Enter') {
      this.addHobby();
    }
  }
  addHobby() {
    this.i = -1;
    this.hobbies.push(this.hobby);
    this.hobby = '';
  }
  titleChange() {
    this.title = 'koko';
    this.addNum();
  }
  addNum() {
    this.numbers.push(this.numbers.length + 1);
  }
  getColor(n) {
    return n % 2 === 0 ? 'red' : 'green';
  }
  getBack(name: string) {
    alert(name);
  }
}
