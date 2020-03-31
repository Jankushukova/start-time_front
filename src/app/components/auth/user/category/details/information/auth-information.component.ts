import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth-information',
  templateUrl: './auth-information.component.html',
  styleUrls: ['./auth-information.component.css']
})
export class AuthInformationComponent implements OnInit {
  num = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/details/description');
  }
  changeClass(element) {
    this.num = element;
  }

}
