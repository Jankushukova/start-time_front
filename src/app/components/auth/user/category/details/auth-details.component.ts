import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../services/project/project.service';
import {Project} from '../../../../../models/project/project';
import {User} from '../../../../../models/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert';
// @ts-ignore
import bootbox = require('bootbox');

@Component({
  selector: 'app-details',
  templateUrl: './auth-details.component.html',
  styleUrls: ['./auth-details.component.css']
})
export class AuthDetailsComponent implements OnInit {
  project:Project = null;
  progress = 0;
  safeURL;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService:ProjectService,
    private _sanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.projectService.addView(id).subscribe(perf=>{
      console.log("view +1");
    })
    this.projectService.findById(id).subscribe(perf=>{
      this.project = perf;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.project.video);

      this.progress = (this.project.gathered/this.project.goal)*100;
    })

  }
  async show() {
    bootbox.alert({
      title: "Baking gifts",
      message: "This is the large alert!",
      size: 'large',
      centerVertical:true,
    })
  }
}
