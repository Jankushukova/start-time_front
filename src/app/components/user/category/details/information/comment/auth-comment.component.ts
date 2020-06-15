import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {ProjectComment} from '../../../../../../models/project/projectComment';
import {CommentService} from '../../../../../../services/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleAuthService} from '../../../../../../services/auth.service';
import {ProjectService} from "../../../../../../services/project/project.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-comment',
  templateUrl: './auth-comment.component.html',
  styleUrls: ['./auth-comment.component.css']
})
export class AuthCommentComponent implements OnInit {
  authorized = false;
  @Input() project: Project;
  comments: ProjectComment[] = [];
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private builder: FormBuilder,
    private userService: UserService,
    private projectService: ProjectService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService

  ) { }

  ngOnInit(): void {
    console.log(this.project);
    this.commentFormInit();
    this.projectService.comments$.subscribe(perf => this.comments = perf);
    this.commentService.getCommentsOfProject(this.project.id).subscribe(perf => {
      this.projectService.changeComments(perf);
    });
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
  }
  commentFormInit() {
    this.commentForm = this.builder.group({
      text: ['', [Validators.required]],
    });
  }

  addComment() {
    if (this.authorized) {
      const comment: ProjectComment = this.commentForm.getRawValue();
      comment.user_id = this.userService.getUser().id;
      comment.project_id = this.project.id;
      this.commentService.createProjectComment(comment).subscribe(perf => {
        this.comments = [...this.comments, perf];
        this.comments.sort().reverse();
        this.projectService.changeComments(this.comments);
        this.commentForm.reset();

      });
    } else {
      this.translator.get('project.comment.warning').subscribe(perf => {
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
