import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user/user';
import {Project} from '../../../../models/project/project';
import {ProjectService} from '../../../../services/project/project.service';

@Component({
  selector: 'app-auth-user-projects',
  templateUrl: './auth-user-projects.component.html',
  styleUrls: ['./auth-user-projects.component.css']
})
export class AuthUserProjectsComponent implements OnInit {
  user: User;
  projects: Project[] = [];
  perPageCount = 5;
  totalProjectsCount: number;
  page = 1;
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
  }

  shareUserWithChild(data) {
    this.user = data;
    this.changeProjects();
  }

  changeProjects() {
    this.projects = null;
    this.projectService.getProjectsOfUser(this.user.id, this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalProjectsCount = perf.total;
      console.log(this.totalProjectsCount);
      this.projects = perf.data.map(data => new Project().deserialize(data));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeProjects();
  }
}
