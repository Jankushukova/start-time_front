import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Project} from '../../../../../models/project/project';

@Component({
  selector: 'app-auth-information',
  templateUrl: './auth-information.component.html',
  styleUrls: ['./auth-information.component.css']
})
export class AuthInformationComponent implements OnInit {
  num = 1;
  @Input() project: Project;

  constructor( private router: Router,
               private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }
  changeClass(element) {
    this.num = element;
  }

}
