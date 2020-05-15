import {Component, Input, OnInit} from '@angular/core';
import {News} from "../../../../../models/news/news";
import {Project} from "../../../../../models/project/project";
import {ProjectLike} from "../../../../../models/project/projectLike";
import {NewsLike} from "../../../../../models/news/newsLike";
import {UserService} from "../../../../../services/user/user.service";
import {LikeService} from "../../../../../services/like.service";

@Component({
  selector: 'app-auth-news-entity',
  templateUrl: './auth-news-entity.component.html',
  styleUrls: ['./auth-news-entity.component.css']
})
export class AuthNewsEntityComponent implements OnInit {
  @Input() news:News
  constructor(
    private userService:UserService,
    private likeService:LikeService
  ) { }

  ngOnInit(): void {
  }


  like(){
    let like:NewsLike = new NewsLike();
    like.user_id = this.userService.getUser().id;
    like.news_id = this.news.id;

    this.likeService.createNewsLike(like).subscribe(perf=>{
      this.news.likes.push(perf);
      this.news.liked = true;
    })
  }

  unlike(){
    this.likeService.deleteByIdNewsLike(this.news.id).subscribe(perf=>{
      console.log(perf);
      // @ts-ignore
      this.news.likes = this.news.likes.filter(like => like.id!=perf.id);
      this.news.liked = false;


    })
  }

}
