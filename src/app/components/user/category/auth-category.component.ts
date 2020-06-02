import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {Project} from '../../../models/project/project';
import {ProjectLike} from '../../../models/project/projectLike';
import {UserService} from '../../../services/user/user.service';
import {LikeService} from '../../../services/like.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SimpleAuthService} from '../../../services/auth.service';

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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private authService: SimpleAuthService,
    private likeService: LikeService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    this.route.paramMap.subscribe( paramMap => {
      this.categoryId = parseInt(paramMap.get('id'), 10);
      this.changeProjects();
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
      this.openSnackBar('Only authorized users can like', 'Close', 'style-warn');
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
      this.openSnackBar('Only authorized users can unlike', 'Close', 'style-warn');
    }
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
