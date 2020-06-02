import {Component, Input, OnInit} from '@angular/core';
import {ProjectComment} from '../../../../../../../models/project/projectComment';
import {LikeService} from '../../../../../../../services/like.service';
import {CommentLike} from '../../../../../../../models/commentLike';
import {UserService} from '../../../../../../../services/user/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleAuthService} from '../../../../../../../services/auth.service';

@Component({
  selector: 'app-auth-comment-entity',
  templateUrl: './auth-comment-entity.component.html',
  styleUrls: ['./auth-comment-entity.component.css']
})
export class AuthCommentEntityComponent implements OnInit {
  @Input() comment: ProjectComment;
  authorized = false;
  constructor(
    private likeService: LikeService,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
      this.openSnackBar('Only authorized users can like', 'Close', 'style-warn');
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
      this.openSnackBar('Only authorized users can unlike', 'Close', 'style-warn');
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
