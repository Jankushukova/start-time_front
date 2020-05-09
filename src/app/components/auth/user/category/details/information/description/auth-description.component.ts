import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../../models/project/project';

@Component({
  selector: 'app-description',
  templateUrl: './auth-description.component.html',
  styleUrls: ['./auth-description.component.css']
})
export class AuthDescriptionComponent implements OnInit {
  project:Project;

  constructor() { }

  ngOnInit(): void {
  }

  someFunction(data){
   this.project = data;

  }

}
