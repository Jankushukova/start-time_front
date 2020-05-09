import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../services/project.service';
import {Project} from '../../../../../models/project';
import {User} from '../../../../../models/user';
@Component({
  selector: 'app-details',
  templateUrl: './auth-details.component.html',
  styleUrls: ['./auth-details.component.css']
})
export class AuthDetailsComponent implements OnInit {
  project:Project = null;
  progress = 0;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService:ProjectService
  ) { }

  ngOnInit(): void {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.projectService.findById(id).subscribe(perf=>{
      this.project = perf;
      this.progress = (this.project.gathered/this.project.goal)*100;
    })
  }
  show() {
  }

}
