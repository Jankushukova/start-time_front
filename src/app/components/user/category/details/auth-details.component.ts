import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project/project';
import {User} from '../../../../models/user/user';
import { DomSanitizer } from '@angular/platform-browser';
import swal from 'sweetalert';
// @ts-ignore
import bootbox = require('bootbox');
import {Product} from "../../../../models/product/product";
import {AuthProductDetailsComponent} from "../../shop/product-details/auth-product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {BakeProjectComponent} from "./bake-project/bake-project.component";
import {TranslateService} from "@ngx-translate/core";
import {UserService} from "../../../../services/user/user.service";

@Component({
  selector: 'app-details',
  templateUrl: './auth-details.component.html',
  styleUrls: ['./auth-details.component.css']
})
export class AuthDetailsComponent implements OnInit {
  project: Project = null;
  progress = 0;
  safeURL;
  translate;
  mobile = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private userService: UserService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private translator: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.translate = this.translator;
    this.projectInit();
    $(document).ready(() => {
      const ua = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
  }
  projectInit() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.projectService.addView(id).subscribe(perf => {
    });
    this.projectService.findById(id).subscribe(perf => {
      this.project = perf;
      try {
      } catch (e) {
      }
      this.progress = Math.ceil(( parseInt(this.project.gathered, 10) /  parseInt(this.project.goal, 10))  * 100 );
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(BakeProjectComponent, {
      data: {
        projectId: this.project.id,
      },
      width: (this.mobile) ? '100%' : '60%'
    });
  }
  videoURL() {
    if (this.project.video.includes('youtu.be')) {
      return this.sanitizer.bypassSecurityTrustResourceUrl(this.project.video.replace('youtu.be', 'youtube.com/embed'));
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.project.video.replace('watch?v=', 'embed/'));
  }
  inLocale(sum) {
    return parseInt(sum, 10).toLocaleString();
  }
  editFormat(date) {
    const d1 = date.split('/');
    return d1[1] + '-' + d1[0] + '-' + d1[2];
  }
}
