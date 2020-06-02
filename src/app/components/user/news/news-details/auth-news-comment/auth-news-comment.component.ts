import {Component, Input, OnInit} from '@angular/core';
import {NewsComment} from '../../../../../models/news/newsComment';
import {CommentLike} from '../../../../../models/commentLike';
import {UserService} from '../../../../../services/user/user.service';
import {LikeService} from '../../../../../services/like.service';
import {SimpleAuthService} from '../../../../../services/auth.service';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-auth-news-comment',
  templateUrl: './auth-news-comment.component.html',
  styleUrls: ['./auth-news-comment.component.css']
})
export class AuthNewsCommentComponent implements OnInit {
  authorized = false;
  @Input() comment: NewsComment;
  constructor(
    private userService: UserService,
    private authService: SimpleAuthService,
    private likeService: LikeService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.authorized = this.authService.loggedIn(false);

  }

  like() {
    if (this.authorized) {
      const like: CommentLike = new CommentLike();
      like.news_comment_id = this.comment.id;
      like.project_comment_id = null;
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
      this.openSnackBar('Only authorized users can like', 'Close', 'style-warn');

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
