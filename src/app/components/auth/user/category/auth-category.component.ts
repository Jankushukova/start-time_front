import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project/project';

@Component({
  selector: 'app-category',
  templateUrl: './auth-category.component.html',
  styleUrls: ['./auth-category.component.css']
})
export class AuthCategoryComponent implements OnInit {
  projects: Project[] = []
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService:ProjectService
  ) {
    router.events.subscribe((val) =>{
      if(val instanceof NavigationEnd){
        this.changeProjects(route.snapshot.paramMap.get('id'));
      }
    })

  }

  ngOnInit(): void {


  }

  changeProjects(id){
    this.projectService.getProjectsOfCategory(id).subscribe(perf=>{
      this.projects = perf;
    })
  }

}
