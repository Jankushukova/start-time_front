import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project-information',
  templateUrl: './user-project-information.component.html',
  styleUrls: ['./user-project-information.component.css']
})
export class UserProjectInformationComponent implements OnInit {
  num = 1;
  constructor() { }

  ngOnInit(): void {
  }
  changeClass(element) {
    this.num = element;
  }


}
