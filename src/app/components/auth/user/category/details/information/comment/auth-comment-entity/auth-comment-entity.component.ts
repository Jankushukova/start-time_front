import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../../../models/project';
import {ProjectComment} from '../../../../../../../../models/projectComment';
import {LikeService} from '../../../../../../../../services/like.service';
import {CommentLike} from '../../../../../../../../models/commentLike';
import {UserService} from '../../../../../../../../services/user.service';
import {ProjectLike} from '../../../../../../../../models/projectLike';

@Component({
  selector: 'app-auth-comment-entity',
  templateUrl: './auth-comment-entity.component.html',
  styleUrls: ['./auth-comment-entity.component.css']
})
export class AuthCommentEntityComponent implements OnInit {
  @Input() comment:ProjectComment;
  constructor(
    private likeService: LikeService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    console.log(this.comment.liked);
  }


  like(){
    let like: CommentLike = new CommentLike();
    like.project_comment_id = this.comment.id;
    like.news_comment_id = null;
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
