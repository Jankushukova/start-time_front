import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {ProjectOrderService} from "../../../../services/project/project-order.service";
import {ProjectService} from "../../../../services/project/project.service";
import {Project} from "../../../../models/project/project";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-baked',
  templateUrl: './home-baked.component.html',
  styleUrls: ['./home-baked.component.css']
})
export class HomeBakedComponent implements OnInit {
  bakes: any[] = [];
  translate:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private projectService: ProjectService,
    private translateService: TranslateService
  ) {
    this.translate = translateService;

  }

  ngOnInit(): void {
    this.projectService.getBakedProjectsOfUser(this.data.user).subscribe(perf => {
      this.bakes = perf;
    })
  }

}
