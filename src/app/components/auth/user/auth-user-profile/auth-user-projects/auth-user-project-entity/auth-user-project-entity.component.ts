import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../../../models/project/project";
import {ProjectService} from "../../../../../../services/project/project.service";
import {LikeService} from "../../../../../../services/like.service";
import {ProjectLike} from "../../../../../../models/project/projectLike";
import {UserService} from "../../../../../../services/user/user.service";

@Component({
  selector: 'app-auth-user-project-entity',
  templateUrl: './auth-user-project-entity.component.html',
  styleUrls: ['./auth-user-project-entity.component.css']
})
export class AuthUserProjectEntityComponent implements OnInit {
 @Input() project:Project;
  constructor(
    private projectService:ProjectService,
    private likeService:LikeService,
    private userService:UserService
  ) { }

  ngOnInit(): void {
    this.projectService.findById(this.project.id).subscribe(perf=>{
      this.project = perf;
    })
  }

  like(){
    let like:ProjectLike = new ProjectLike();
    like.user_id = this.userService.getUser().id;
    like.project_id = this.project.id;

    this.likeService.createProjectLike(like).subscribe(perf=>{
      this.project.likes.push(perf);
      this.project.liked = true;
    })
  }

  unlike(){
    this.likeService.deleteByIdProjectLike(this.project.id).subscribe(perf=>{
      console.log(perf);
      // @ts-ignore
      this.project.likes = this.project.likes.filter(like => like.id!=perf.id);
      this.project.liked = false;


    })
  }
}
