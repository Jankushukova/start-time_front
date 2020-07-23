import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {FollowerService} from "../../../../services/user/follower.service";
import {ProjectOrderService} from "../../../../services/project/project-order.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-home-bakers',
  templateUrl: './home-bakers.component.html',
  styleUrls: ['./home-bakers.component.css']
})
export class HomeBakersComponent implements OnInit {
  bakers: any[] ;
  translate:any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private projectOrderService: ProjectOrderService,
    private translateService: TranslateService
  ) {

  }

  ngOnInit(): void {
    this.translate = this.translateService;
    this.projectOrderService.getBakersOfUser(this.data.user).subscribe(perf => {
      this.bakers = perf;
    })
  }

}
