import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../../models/project';
import {ProjectComment} from '../../../../../../../models/projectComment';
import {ProjectService} from '../../../../../../../services/project.service';
import {CommentService} from '../../../../../../../services/comment.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../../services/user.service';

@Component({
  selector: 'app-comment',
  templateUrl: './auth-comment.component.html',
  styleUrls: ['./auth-comment.component.css']
})
export class AuthCommentComponent implements OnInit {
  project:Project;
  comments: ProjectComment[] = [];
  commentForm: FormGroup;

  constructor(
    private commentService: CommentService,
    private builder: FormBuilder,
    private userService:UserService

  ) { }

  ngOnInit(): void {
    this.commentForm = this.builder.group({
      text: ['', [Validators.required]],
    });
  }
  someFunction(data){
    this.project = data;
    this.commentService.getCommentsOfProjectAuth(this.project.id).subscribe(perf=>{
      this.comments = perf;
    })
  }

  addComment(){
    let comment:ProjectComment = this.commentForm.getRawValue();
    comment.user_id = this.userService.getUser().id;
    comment.project_id = this.project.id;
    this.commentService.createProjectComment(comment).subscribe(perf=>{

      this.comments.push(new ProjectComment().deserialize(perf));
      console.log(this.comments);
    })
  }

}
