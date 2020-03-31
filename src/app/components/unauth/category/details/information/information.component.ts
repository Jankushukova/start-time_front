import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit {
  num = 1;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  changeClass(element) {
    this.num = element;
  }

}
