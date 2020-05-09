import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../../models/project';
import {ProjectQuestion} from '../../../../../../../models/projectQuestion';
import {ProjectService} from '../../../../../../../services/project.service';

@Component({
  selector: 'app-question',
  templateUrl: './auth-question.component.html',
  styleUrls: ['./auth-question.component.css']
})
export class AuthQuestionComponent implements OnInit {
  project:Project;
  questions:ProjectQuestion[] = [];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  someFunction(data){
    this.project = data;
    this.projectService.getQuestionsOfProject(this.project.id).subscribe(perf=>{
      this.questions = perf;
    })
  }
}
