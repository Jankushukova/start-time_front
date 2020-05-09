import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Project} from '../../../../../../models/project';

@Component({
  selector: 'app-auth-information',
  templateUrl: './auth-information.component.html',
  styleUrls: ['./auth-information.component.css']
})
export class AuthInformationComponent implements OnInit {
  num = 1;
  @Input() project:Project;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  changeClass(element) {
    this.num = element;
  }


  onActivate(componentReference){
      componentReference.someFunction(this.project);
  }

}
