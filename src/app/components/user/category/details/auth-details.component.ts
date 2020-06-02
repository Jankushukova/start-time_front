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

@Component({
  selector: 'app-details',
  templateUrl: './auth-details.component.html',
  styleUrls: ['./auth-details.component.css']
})
export class AuthDetailsComponent implements OnInit {
  project: Project = null;
  progress = 0;
  safeURL;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    public dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.projectInit();
  }
  projectInit() {
    const id: number = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.projectService.addView(id).subscribe(perf => {
    });
    this.projectService.findById(id).subscribe(perf => {
      this.project = perf;
      try {
      } catch (e) {
        alert('Could not load video');
      }
      this.progress = (this.project.gathered / this.project.goal) * 100;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(BakeProjectComponent, {
      data: {
        projectId: this.project.id,
      },
      width: '60%'
    });
  }
}
