import { Component, OnInit } from '@angular/core';
import {Project} from '../../../../models/project/project';
import {ProjectLike} from "../../../../models/project/projectLike";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../../services/project/project.service";
import {UserService} from "../../../../services/user/user.service";
import {LikeService} from "../../../../services/like.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  projects: Project[] = [];
  page = 1;
  perPageCount = 5;
  totalProjectsCount: number;
  newLike: ProjectLike;
  translate;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private likeService: LikeService,
    private translator: TranslateService
  ) {
  }
  ngOnInit(): void {
    this.translate = this.translator;
    this.changeProjects();
  }
  changeProjects() {
    this.projects = null;
    this.userService.getRecommendationsOfUser(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalProjectsCount = perf.total;
      this.projects = perf.data.map(data => new Project().deserialize(data));
      console.log(this.projects);
      console.log(this.projects[0]);
      console.log(this.projects[0].title_rus);
    });
  }
  changePage(event) {
    this.page = event;
    this.changeProjects();
  }

  like(project: Project) {
    const like: ProjectLike = new ProjectLike();
    like.user_id = this.userService.getUser().id;
    like.project_id = project.id;
    this.newLike = like;

    this.likeService.createProjectLike(like).subscribe(perf => {
      project.likes.push(perf);
      project.liked = true;
    });
  }

  unlike(project: Project) {
    this.likeService.deleteByIdProjectLike(project.id).subscribe((perf: any) => {
      // tslint:disable-next-line:no-non-null-assertion
      project.likes = project.likes.filter((like: ProjectLike) => like.id !== perf.id);
      project.liked = false;


    });
  }
}
