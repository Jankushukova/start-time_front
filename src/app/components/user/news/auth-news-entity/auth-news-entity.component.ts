import {Component, Input, OnInit} from '@angular/core';
import {News} from '../../../../models/news/news';
import {NewsLike} from '../../../../models/news/newsLike';
import {UserService} from '../../../../services/user/user.service';
import {LikeService} from '../../../../services/like.service';
import {SimpleAuthService} from '../../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-news-entity',
  templateUrl: './auth-news-entity.component.html',
  styleUrls: ['./auth-news-entity.component.css']
})
export class AuthNewsEntityComponent implements OnInit {
  @Input() news: News;
  authorized = false;
  translate;
  constructor(
    private userService: UserService,
    private likeService: LikeService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
      console.log(perf);
    });
  }
  like() {
    if (this.authorized) {
      const like: NewsLike = new NewsLike();
      like.user_id = this.userService.getUser().id;
      like.news_id = this.news.id;

      this.likeService.createNewsLike(like).subscribe(perf => {
        this.news.likes.push(perf);
        this.news.liked = true;
      });
    } else {
      this.translator.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });
    }
  }

  unlike() {
    if (this.authorized) {
      this.likeService.deleteByIdNewsLike(this.news.id).subscribe(perf => {
        // @ts-ignore
        this.news.likes = this.news.likes.filter(like => like.id !== perf.id);
        this.news.liked = false;
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

}
