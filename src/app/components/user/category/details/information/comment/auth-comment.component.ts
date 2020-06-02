import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {ProjectComment} from '../../../../../../models/project/projectComment';
import {CommentService} from '../../../../../../services/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleAuthService} from '../../../../../../services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './auth-comment.component.html',
  styleUrls: ['./auth-comment.component.css']
})
export class AuthCommentComponent implements OnInit {
  authorized = false;
  project: Project;
  comments: ProjectComment[] = [];
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private builder: FormBuilder,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.commentFormInit();
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
  }
  commentFormInit() {
    this.commentForm = this.builder.group({
      text: ['', [Validators.required]],
    });
  }
  someFunction(data) {
    this.project = data;
    this.commentService.getCommentsOfProject(this.project.id).subscribe(perf => {
      this.comments = perf;
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
        this.commentForm.reset();

      });
    } else {
      this.openSnackBar('Only authorized users can leave a comment', 'Close', 'style-warn');
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
