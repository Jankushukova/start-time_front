import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../services/project/project.service';
import {Project} from '../../../../../models/project/project';
import {User} from '../../../../../models/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert';
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
    this.projectService.findById(id).subscribe(perf=>{
      this.project = perf;
      this.safeURL = this._sanitizer.bypassSecurityTrustResourceUrl(this.project.video);

      this.progress = (this.project.gathered/this.project.goal)*100;
    })
  }
  async show() {
    // @ts-ignore
    bootbox.prompt({
      title: "This is a prompt with a set of radio inputs!",
      message: '<p>Please select an option below:</p>',
      inputType: 'radio',
      inputOptions: [
        {
          text: 'Choice One',
          value: '1',
        },
        {
          text: 'Choice Two',
          value: '2',
        },
        {
          text: 'Choice Three',
          value: '3',
        }
      ],
      callback: function (result) {
        console.log(result);
      }
    });
  }

}
