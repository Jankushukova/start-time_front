import {Component, Input, OnInit} from '@angular/core';
import {NewsComment} from "../../../../../../models/news/newsComment";
import {CommentLike} from "../../../../../../models/commentLike";
import {UserService} from "../../../../../../services/user/user.service";
import {LikeService} from "../../../../../../services/like.service";

@Component({
  selector: 'app-auth-news-comment',
  templateUrl: './auth-news-comment.component.html',
  styleUrls: ['./auth-news-comment.component.css']
})
export class AuthNewsCommentComponent implements OnInit {
  @Input() comment:NewsComment
  constructor(
    private userService:UserService,
    private likeService:LikeService,
  ) { }

  ngOnInit(): void {

  }

  like(){
    let like: CommentLike = new CommentLike();
    like.news_comment_id = this.comment.id;
    like.project_comment_id = null;
    like.user_id = this.userService.getUser().id;
    this.likeService.createCommentLike(like).subscribe(perf=>{
      this.comment.liked = true;
      this.comment.likes.push((new CommentLike().deserialize(perf)).id);
    })
  }
  unLike(){
    this.likeService.deleteByIdCommentLike(this.comment.id).subscribe(perf=>{
      this.comment.liked = false;
      this.comment.likes = this.comment.likes.filter(like => like!=perf.id);
    }, error => {
    })
  }

}
