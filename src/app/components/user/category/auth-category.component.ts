import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {Project} from '../../../models/project/project';
import {ProjectLike} from '../../../models/project/projectLike';
import {UserService} from '../../../services/user/user.service';
import {LikeService} from '../../../services/like.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleAuthService} from '../../../services/auth.service';
import {TranslateService} from "@ngx-translate/core";
import {ProjectCategoryService} from "../../../services/project/project-category.service";

@Component({
  selector: 'app-category',
  templateUrl: './auth-category.component.html',
  styleUrls: ['./auth-category.component.css']
})
export class AuthCategoryComponent implements OnInit {
  authorized = false;
  projects: Project[] = [];
  categoryId: number;
  page = 1;
  perPageCount = 12;
  totalProjectsCount: number;
  newLike: ProjectLike;
  translate;
  category;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private categoryService: ProjectCategoryService,
    private userService: UserService,
    private authService: SimpleAuthService,
    private likeService: LikeService,
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
      this.categoryId = parseInt(paramMap.get('id'), 10);
      this.changeProjects();
      this.categoryService.findById(this.categoryId).subscribe(perf => this.category = perf);

    });
  }
  changeProjects() {
    this.projects = null;
    this.projectService.getProjectsOfCategory(this.categoryId, this.perPageCount, this.page ).subscribe((perf: any) => {
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
  progress(project: Project) {
    return Math.ceil(( parseInt(project.gathered, 10) /  parseInt(project.goal, 10))  * 100 );
  }
  inLocale(sum) {
    return parseInt(sum, 10).toLocaleString();
  }
}
