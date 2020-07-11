import {Component, Input, OnInit} from '@angular/core';
import {ProjectComment} from '../../../../../../../models/project/projectComment';
import {LikeService} from '../../../../../../../services/like.service';
import {CommentLike} from '../../../../../../../models/commentLike';
import {UserService} from '../../../../../../../services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleAuthService} from '../../../../../../../services/auth.service';
import {ProjectService} from "../../../../../../../services/project/project.service";
import {CommentService} from "../../../../../../../services/comment.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-comment-entity',
  templateUrl: './auth-comment-entity.component.html',
  styleUrls: ['./auth-comment-entity.component.css']
})
export class AuthCommentEntityComponent implements OnInit {
  @Input() comment: ProjectComment;
  authorized = false;
  isOwnerOfComment = false;
  isAdmin = false;
  constructor(
    private likeService: LikeService,
    private userService: UserService,
    private authService: SimpleAuthService,
    private projectService: ProjectService,
    private commentService: CommentService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    if (this.userService.getUser()) {
      this.isAdmin = this.userService.isAdmin();
      this.isOwnerOfComment = this.comment.user.id === this.userService.getUser().id;
    }
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
  }


  like() {
    if (this.authorized) {
      const like: CommentLike = new CommentLike();
      like.project_comment_id = this.comment.id;
      like.news_comment_id = null;
      like.user_id = this.userService.getUser().id;
      this.likeService.createCommentLike(like).subscribe(perf => {
        this.comment.liked = true;
        this.comment.likes.push((new CommentLike().deserialize(perf)).id);
      });
    } else {
      this.translator.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });
    }
  }
  unLike() {
    if (this.authorized) {
      this.likeService.deleteByIdCommentLike(this.comment.id).subscribe(perf => {
        this.comment.liked = false;
        this.comment.likes = this.comment.likes.filter(like => like !== perf.id);
      }, error => {
      });
    } else {
      this.translator.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });    }
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }

  deleteComment() {
    this.commentService.deleteByIdProjectComment(this.comment.id).subscribe(perf => {
    });
    let comments: ProjectComment[] = [];
    this.projectService.comments$.subscribe(perf => comments = perf);
    comments = comments.filter(data => {
      return data.id !== this.comment.id;
    });
    this.projectService.changeComments(comments);
  }
}
