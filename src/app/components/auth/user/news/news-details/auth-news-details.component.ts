import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NewsService} from "../../../../../services/news/news.service";
import {News} from "../../../../../models/news/news";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectComment} from "../../../../../models/project/projectComment";
import {NewsComment} from "../../../../../models/news/newsComment";
import {UserService} from "../../../../../services/user/user.service";
import {CommentService} from "../../../../../services/comment.service";

@Component({
  selector: 'app-news-details',
  templateUrl: './auth-news-details.component.html',
  styleUrls: ['./auth-news-details.component.css']
})
export class AuthNewsDetailsComponent implements OnInit {
  news:News;
  comments: NewsComment[] = [];
  commentForm: FormGroup;

  constructor(
    private route:ActivatedRoute,
    private newsService:NewsService,
    private userService:UserService,
    private commentService:CommentService,
    private builder: FormBuilder,

  ) { }
  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };

  ngOnInit(): void {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.newsService.addView(id).subscribe(perf=>{
    })
    this.newsService.findById(id).subscribe(perf=>{
      this.news = perf;
      this.commentService.getCommentsOfNews(this.news.id).subscribe(perf=>{
        this.comments = perf;
      })
    })

    this.commentForm = this.builder.group({
      description: ['', [Validators.required]],
    });



  }
  addComment(){
    let comment:NewsComment = this.commentForm.getRawValue();
    comment.user_id = this.userService.getUser().id;
    comment.news_id = this.news.id;
    this.commentService.create(comment).subscribe(perf=>{
      this.comments = [...this.comments, perf];
      this.comments.sort().reverse();
      this.commentForm.reset();

    })
  }

}
