import { Component, OnInit } from '@angular/core';
import {Project} from "../../../models/project/project";
import {ProjectService} from "../../../services/project/project.service";
import {UserService} from "../../../services/user/user.service";
import {SimpleAuthService} from "../../../services/auth.service";
import {Product} from "../../../models/product/product";
import {AuthProductDetailsComponent} from "../../user/shop/product-details/auth-product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectEditComponent} from "./project-edit/project-edit.component";

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements OnInit {
  projects: Project[] = [];
  categoryId: number;
  page = 1;
  perPageCount = 12;
  totalProjectsCount: number;
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private authService: SimpleAuthService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.changeProjects();
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

  openDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectEditComponent, {
      data: {
        projectId: project.id,
      },
      width: '60%'
    });
  }
}
