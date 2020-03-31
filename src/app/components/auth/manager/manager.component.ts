import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css']
})
export class ManagerComponent implements OnInit {

  constructor( private userService: UserService,
               private router: Router
               ) { }

  ngOnInit(): void {
    if (!this.userService.isManager()) {
      this.router.navigateByUrl('/start/login');
    }
  }
  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }

}
