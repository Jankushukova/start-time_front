import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../../models/project/project';
import {ProjectQuestion} from '../../../../../../../models/project/projectQuestion';
import {ProjectService} from '../../../../../../../services/project/project.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectComment} from "../../../../../../../models/project/projectComment";
import {UserService} from "../../../../../../../services/user/user.service";

@Component({
  selector: 'app-question',
  templateUrl: './auth-question.component.html',
  styleUrls: ['./auth-question.component.css']
})
export class AuthQuestionComponent implements OnInit {
  project:Project;
  questions:ProjectQuestion[] = [];
  questionForm: FormGroup;


  constructor(
    private projectService: ProjectService,
    private builder: FormBuilder,
    private userService:UserService


  ) {
    this.questionForm = this.builder.group({
      question: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
  }

  someFunction(data){
    this.project = data;
    this.projectService.getQuestionsOfProject(this.project.id).subscribe(perf=>{
      this.questions = perf;
    })
  }

  addQuestion(){
    let question:ProjectQuestion = this.questionForm.getRawValue();
    question.user_id = this.userService.getUser().id;
    question.project_id = this.project.id;
    this.projectService.createProjectQuestion(question).subscribe(perf=>{
      this.questions = [...this.questions, perf];
      this.questions.sort().reverse();
      this.questionForm.reset();
    })
  }
}
