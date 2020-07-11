import { Component, OnInit } from '@angular/core';
import {Project} from "../../../../models/project/project";
import {ProjectService} from "../../../../services/project/project.service";

@Component({
  selector: 'app-add-popular',
  templateUrl: './add-popular.component.html',
  styleUrls: ['./add-popular.component.css']
})
export class AddPopularComponent implements OnInit {
  projects: Project[] = [];
  count = 0;
  message = '';
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getActiveProjects().subscribe((perf: any) => {
      this.projects = perf.map(data => new Project().deserialize(data));
      this.projects.map(data => {
        if (data.main) {
          this.count++;
        }
      });
      if ( this.count > 4) {
        this.message = 'Максимальное количество популярных проектов 5';
      }
    });
  }
  changed(event, project) {
    if (this.count <= 4 && event.checked) {
      this.projectService.editPopular(project.id).subscribe(perf => {
        project.main = 1;
        this.count++;
        let projects: Project[] = [];
        this.projectService.activeProjects$.subscribe(perf2 => projects = perf2);
        projects.push(project);
        this.projectService.changeActiveProjects(projects);
      });
    } else if (event.checked && this.count > 4) {
      this.message = 'Максимальное количество популярных проектов 5';
    } else if (!event.checked) {
      this.projectService.editPopular(project.id).subscribe(perf => {
        project.main = 0;
        this.count--;
        let projects: Project[] = [];
        this.projectService.activeProjects$.subscribe(perf2 => projects = perf2);
        projects = projects.filter(data => data.id !== project.id);
        this.projectService.changeActiveProjects(projects);
      });
    }
  }

}
