import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../../../models/project/project";
import {ProjectService} from "../../../../../../services/project/project.service";

@Component({
  selector: 'app-auth-user-project-entity',
  templateUrl: './auth-user-project-entity.component.html',
  styleUrls: ['./auth-user-project-entity.component.css']
})
export class AuthUserProjectEntityComponent implements OnInit {
 @Input() project:Project;
  constructor(
    private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    this.projectService.findById(this.project.id).subscribe(perf=>{
      this.project = perf;
    })
  }

}
