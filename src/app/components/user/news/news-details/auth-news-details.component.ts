import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NewsService} from '../../../../services/news/news.service';
import {News} from '../../../../models/news/news';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsComment} from '../../../../models/news/newsComment';
import {UserService} from '../../../../services/user/user.service';
import {CommentService} from '../../../../services/comment.service';
import {SimpleAuthService} from '../../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-news-details',
  templateUrl: './auth-news-details.component.html',
  styleUrls: ['./auth-news-details.component.css']
})
export class AuthNewsDetailsComponent implements OnInit {
  authorized = false;
  news: News;
  comments: NewsComment[] = [];
  commentForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private newsService: NewsService,
    private userService: UserService,
    private commentService: CommentService,
    private builder: FormBuilder,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) { }
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false
  };

  ngOnInit(): void {
    this.authorized = this.authService.loggedIn(false);
    this.newsInit();
    this.initCommentForm();
  }
  initCommentForm() {
    this.commentForm = this.builder.group({
      description: ['', [Validators.required]],
    });
  }
  newsInit() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.newsService.addView(id).subscribe(perf => {
    });
    this.newsService.findById(id).subscribe(perf => {
      this.news = perf;
      this.commentsInit();
    });
  }
  commentsInit() {
    this.commentService.getCommentsOfNews(this.news.id).subscribe(perf => {
      this.comments = perf;
    });
  }
  addComment() {
    if (this.authorized) {
      const comment: NewsComment = this.commentForm.getRawValue();
      comment.user_id = this.userService.getUser().id;
      comment.news_id = this.news.id;
      this.commentService.create(comment).subscribe(perf => {
        this.comments = [...this.comments, perf];
        this.comments.sort().reverse();
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
