import {Component, Input, OnInit} from '@angular/core';
import {ProjectQuestion} from '../../../../../../../../models/project/projectQuestion';

@Component({
  selector: 'app-auth-question-entity',
  templateUrl: './auth-question-entity.component.html',
  styleUrls: ['./auth-question-entity.component.css']
})
export class AuthQuestionEntityComponent implements OnInit {
  @Input() question: ProjectQuestion;
  constructor() { }

  ngOnInit(): void {
  }

}
