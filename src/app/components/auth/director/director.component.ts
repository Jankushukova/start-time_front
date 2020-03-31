import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-director',
  templateUrl: './director.component.html',
  styleUrls: ['./director.component.css']
})
export class DirectorComponent implements OnInit {

  constructor( private userService: UserService,
               private router: Router
  ) { }

  ngOnInit(): void {
    if (!this.userService.isDirector()) {
      this.router.navigateByUrl('/start/login');
    }
  }
  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');
    window.location.reload();
  }
}
