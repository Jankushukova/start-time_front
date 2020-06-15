import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project/project';
import {ProjectLike} from '../../../../models/project/projectLike';
import {UserService} from '../../../../services/user/user.service';
import {LikeService} from '../../../../services/like.service';
import {User} from '../../../../models/user/user';
import {FormControl} from '@angular/forms';
import {Product} from "../../../../models/product/product";
import {AuthProductDetailsComponent} from "../../shop/product-details/auth-product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {EditUnactiveProjectComponent} from "./edit-unactive-project/edit-unactive-project.component";
import {TranslateService} from "@ngx-translate/core";
import {AddProductToFinishedProjectComponent} from "./add-product-to-finished-project/add-product-to-finished-project.component";

@Component({
  selector: 'app-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  selected = new FormControl(0);
  activeProjects: Project[];
  unactiveProjects: Project[];
  finishedProjects: Project[];
  activeProjectpage = 1;
  unactiveProjectpage = 1;
  finishedProjectpage = 1;
  perPageCount = 5;
  totalActiveProjectsCount: number;
  totalUnActiveProjectsCount: number;
  totalFinishedProjectsCount: number;
  userId = 0;
  translate;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    private likeService: LikeService,
    private dialog: MatDialog,
    private translator: TranslateService

  ) { }
  ngOnInit(): void {
    this.translate = this.translator;
    this.userId = this.userService.getUser().id;
    if (parseInt(this.route.snapshot.queryParamMap.get('unactive'), 10) === 1) {
      this.changeUnActiveProjects();
      this.selected.setValue(1);
    } else {
      this.changeActiveProjects();
    }
  }
  changeActiveProjects() {
    this.activeProjects = null;
    this.projectService.getActiveProjectsOfUser(this.perPageCount, this.activeProjectpage ).subscribe((perf: any) => {
      this.totalActiveProjectsCount = perf.total;
      this.activeProjects = perf.data.map(data => new Project().deserialize(data));
      console.log(this.activeProjects);
    });
  }
  changeUnActiveProjects() {
    this.unactiveProjects = null;
    this.projectService.getUnActiveProjectsOfUser(this.perPageCount, this.unactiveProjectpage ).subscribe((perf: any) => {
      this.totalUnActiveProjectsCount = perf.total;
      this.unactiveProjects = perf.data.map(data => new Project().deserialize(data));
      console.log(this.unactiveProjects);
    });
  }
  changeFinishedProjects() {
    console.log('fini');
    this.finishedProjects = null;
    this.projectService.getFinishedProjectsOfUser(this.perPageCount, this.finishedProjectpage ).subscribe((perf: any) => {
      this.totalFinishedProjectsCount = perf.total;
      this.finishedProjects = perf.data.map(data => new Project().deserialize(data));
      console.log(this.finishedProjects);
    });
  }
  changePageFinishedProjects(event) {
    this.finishedProjectpage = event;
    this.changeFinishedProjects();
  }
  changePageActiveProjects(event) {
    this.activeProjectpage = event;
    this.changeActiveProjects();
  }

  changePageUnActiveProjects(event) {
    this.unactiveProjectpage = event;
    this.changeUnActiveProjects();
  }

  like(project: Project) {
    const like: ProjectLike = new ProjectLike();
    like.user_id = this.userService.getUser().id;
    like.project_id = project.id;

    this.likeService.createProjectLike(like).subscribe(perf => {
      // @ts-ignore
      project.likes.push(perf);
      project.liked = true;
    });
  }

  unlike(project: Project) {
    this.likeService.deleteByIdProjectLike(project.id).subscribe(perf => {
      // @ts-ignore
      project.likes = project.likes.filter(like => like.id !== perf.id);
      project.liked = false;


    });
  }

  changed(event) {
    if (event === 0) {
      this.changeActiveProjects();
    } else if (event === 1) {
      this.changeUnActiveProjects();
    } else {
      this.changeFinishedProjects();
    }
  }
  editUnActiveProject(project: Project) {
    const dialogRef = this.dialog.open(EditUnactiveProjectComponent, {
      data: {
        projectId: project.id,
      },
      width: '60%'
    });
  }
  AddProduct(project: Project) {
    const dialogRef = this.dialog.open(AddProductToFinishedProjectComponent, {
      data: {
        projectId: project.id,
      },
      width: '60%'
    });
  }


}
