import {Component, Input, OnInit} from '@angular/core';
import {ProjectQuestion} from '../../../../../../../models/project/projectQuestion';
import {ProjectService} from "../../../../../../../services/project/project.service";
import {UserService} from "../../../../../../../services/user/user.service";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-auth-question-entity',
  templateUrl: './auth-question-entity.component.html',
  styleUrls: ['./auth-question-entity.component.css']
})
export class AuthQuestionEntityComponent implements OnInit {
  @Input() question: ProjectQuestion;
  isOwnerOfProject = false;
  isOwnerOfQuestion = false;
  isAdmin = false;
  isAnswer = false;
  isQuestion = false;
  answerControl = new FormControl('', Validators.required);
  questionControl = new FormControl('', Validators.required);
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    if (this.userService.getUser()) {
      this.isAdmin = this.userService.isAdmin();
      this.isOwnerOfQuestion = this.question.user_id === this.userService.getUser().id;
      this.projectService.findProjectUserById(this.question.project_id).subscribe(perf => {
        this.isOwnerOfProject = perf.id === this.userService.getUser().id;
      });
    }
  }
  saveAnswer() {
    this.isAnswer = false;
    this.question.answer = this.answerControl.value;
    this.projectService.updateProjectQuestion(this.question.id, this.question).subscribe(perf => {
    });

  }
  changeOldAnswer() {
    this.isAnswer = true;
    this.question.answer = null;
  }

  saveQuestion() {
    this.isQuestion = false;
    this.question.question = this.questionControl.value;
    this.projectService.updateProjectQuestion(this.question.id, this.question).subscribe(perf => {
    });
  }
  deleteQuestion() {
    this.projectService.deleteByIdProjectQuestion(this.question.id).subscribe((perf: any) => {
      let questions = [];
      this.projectService.questions$.subscribe(res => {
        questions = res;
      });
      questions = questions.filter((question: ProjectQuestion) => question.id !== this.question.id);
      this.projectService.changeQuestions(questions);
    });
  }
}
