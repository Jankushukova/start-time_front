import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project/project';
import {ProjectLike} from "../../../../models/project/projectLike";
import {UserService} from "../../../../services/user/user.service";
import {LikeService} from "../../../../services/like.service";

@Component({
  selector: 'app-category',
  templateUrl: './auth-category.component.html',
  styleUrls: ['./auth-category.component.css']
})
export class AuthCategoryComponent implements OnInit {
  projects: Project[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService:ProjectService,
    private userService: UserService,
    private likeService:LikeService
  ) {
    router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        this.changeProjects(route.snapshot.paramMap.get('id'));
      }
    })

  }

  ngOnInit(): void {


  }

  changeProjects(id){
    this.projectService.getProjectsOfCategory(id).subscribe(perf=>{
      this.projects = perf;
    })
  }

  like(project:Project){
    let like:ProjectLike = new ProjectLike();
    like.user_id = this.userService.getUser().id;
    like.project_id = project.id;

    this.likeService.createProjectLike(like).subscribe(perf=>{
      // @ts-ignore
      project.likes.push(perf);
      project.liked = true;
    })
  }

  unlike(project:Project){
    this.likeService.deleteByIdProjectLike(project.id).subscribe(perf=>{
      // @ts-ignore
      project.likes = project.likes.filter(like => like.id!=perf.id);
      project.liked = false;


    })
  }
}
