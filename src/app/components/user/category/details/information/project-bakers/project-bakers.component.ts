import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../../../models/project/project";
import {ProjectService} from "../../../../../../services/project/project.service";
import {User} from "../../../../../../models/user/user";

@Component({
  selector: 'app-project-bakers',
  templateUrl: './project-bakers.component.html',
  styleUrls: ['./project-bakers.component.css']
})
export class ProjectBakersComponent implements OnInit {
  @Input() project: Project;
  bakers: User[] = [];
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.getBakersOfProject(this.project.id).subscribe(perf => {
      this.bakers = perf;
    });
  }

}
