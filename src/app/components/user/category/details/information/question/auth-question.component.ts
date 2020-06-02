import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {ProjectQuestion} from '../../../../../../models/project/projectQuestion';
import {ProjectService} from '../../../../../../services/project/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../services/user/user.service';
import {SimpleAuthService} from '../../../../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-question',
  templateUrl: './auth-question.component.html',
  styleUrls: ['./auth-question.component.css']
})
export class AuthQuestionComponent implements OnInit {
  authorized = false;
  project: Project;
  questions: ProjectQuestion[] = [];
  questionForm: FormGroup;


  constructor(
    private projectService: ProjectService,
    private builder: FormBuilder,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,


  ) {
  }

  ngOnInit(): void {
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    this.initQuestionForms();
  }
  initQuestionForms() {
    this.questionForm = this.builder.group({
      question: ['', [Validators.required]],
    });
  }
  someFunction(data) {
    this.project = data;
    this.projectService.getQuestionsOfProject(this.project.id).subscribe(perf => {
      this.questions = perf;
    });
  }

  addQuestion() {
    if (this.authorized) {
      const question: ProjectQuestion = this.questionForm.getRawValue();
      question.user_id = this.userService.getUser().id;
      question.project_id = this.project.id;
      this.projectService.createProjectQuestion(question).subscribe(perf => {
        this.questions = [...this.questions, perf];
        this.questions.sort().reverse();
        this.questionForm.reset();
      });
    } else {
      this.openSnackBar('Only authorized users can ask question', 'Close', 'style-warn');
    }
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
