import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {ProjectQuestion} from '../../../../../../models/project/projectQuestion';
import {ProjectService} from '../../../../../../services/project/project.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../services/user/user.service';
import {SimpleAuthService} from '../../../../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-question',
  templateUrl: './auth-question.component.html',
  styleUrls: ['./auth-question.component.css']
})
export class AuthQuestionComponent implements OnInit {
  authorized = false;
  @Input() project: Project;
  questions: ProjectQuestion[] = [];
  questionForm: FormGroup;
  isOwnerOfProject = false;



  constructor(
    private projectService: ProjectService,
    private builder: FormBuilder,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService


  ) {
  }

  ngOnInit(): void {

    this.projectService.questions$.subscribe(perf => this.questions = perf);
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    if (this.authorized) {
      this.isOwnerOfProject = this.project.owner.id === this.userService.getUser().id;
    }
    this.projectService.getQuestionsOfProject(this.project.id).subscribe(perf => {
      this.questions = perf;
      this.projectService.changeQuestions(this.questions);
    });
    this.initQuestionForms();
  }
  initQuestionForms() {
    this.questionForm = this.builder.group({
      question: ['', [Validators.required]],
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
        this.projectService.changeQuestions(this.questions);

      });
    } else {
      this.translator.get('project.question.warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });
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
