import { Component, OnInit } from '@angular/core';
import {Project} from "../../../models/project/project";
import {ProjectLike} from "../../../models/project/projectLike";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../services/project/project.service";
import {UserService} from "../../../services/user/user.service";
import {SimpleAuthService} from "../../../services/auth.service";
import {LikeService} from "../../../services/like.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {
  authorized = false;
  projects: Project[] = [];
  page = 1;
  perPageCount = 12;
  totalProjectsCount: number;
  newLike: ProjectLike;
  translate;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: SimpleAuthService,
    private likeService: LikeService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.translate = this.translator;
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    this.route.paramMap.subscribe( paramMap => {
      this.changeProjects();
    });
  }
  changeProjects() {
    this.projects = null;
    this.projectService.getAllProjects(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalProjectsCount = perf.total;
      this.projects = perf.data.map(data => new Project().deserialize(data));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeProjects();
  }
  like(project: Project) {
    if (this.authorized) {
      const like: ProjectLike = new ProjectLike();
      like.user_id = this.userService.getUser().id;
      like.project_id = project.id;
      this.newLike = like;

      this.likeService.createProjectLike(like).subscribe(perf => {
        project.likes.push(perf);
        project.liked = true;
      });
    } else {
      this.translator.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });
    }
  }
  unlike(project: Project) {
    if (this.authorized) {
      this.likeService.deleteByIdProjectLike(project.id).subscribe((perf: any) => {
        // tslint:disable-next-line:no-non-null-assertion
        project.likes = project.likes.filter((like: ProjectLike) => like.id !== perf.id);
        project.liked = false;
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
  daysLeft(project: Project) {
    const deadline = project.deadline;
    const d1 = new Date(deadline);
    const d2 = new Date();
    const dif = d1.getTime() - d2.getTime();
    const days = dif / (1000 * 3600 * 24);
    return Math.ceil(days);
  }

}
