import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user/user';
import {UserService} from '../../../services/user/user.service';
import {Project} from '../../../models/project/project';
import {Follower} from '../../../models/user/follower';
import {ProjectOrder} from '../../../models/project/projectOrder';
import {ProjectService} from '../../../services/project/project.service';
import {FollowerService} from '../../../services/user/follower.service';
import {ProjectOrderService} from '../../../services/project/project-order.service';
import {Router} from '@angular/router';
import {SimpleAuthService} from '../../../services/auth.service';
import {TranslateService} from "@ngx-translate/core";
import {MatDialog} from "@angular/material/dialog";
import {HomeFollowersComponent} from "./home-followers/home-followers.component";
import {HomeFollowedComponent} from "./home-followed/home-followed.component";
import {HomeBakersComponent} from "./home-bakers/home-bakers.component";
import {HomeBakedComponent} from "./home-baked/home-baked.component";

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  num = 1;
  user: User;
  authorized = false;
  followers: User[] = [];
  followed: User[] = [];
  bakers: any[] = [];
  baked: Project[] = [];
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private followerService: FollowerService,
    private projectOrderService: ProjectOrderService,
    private authService: SimpleAuthService,
    private router: Router,
    private translator: TranslateService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.authService.authorized$.subscribe(res => {
      this.authorized = res;
    });

    this.userService.getProfileInformation().subscribe(perf => {
        this.user = perf;
      });
  }
  changeClass(element) {
    this.num = element;
  }


  async showFollowers() {
    const dialogRef = this.dialog.open(HomeFollowersComponent, {
      width: '60%',
      data: {user: this.user.id}
    });

  }
  async showFollowed() {
    const dialogRef = this.dialog.open(HomeFollowedComponent, {
      width: '60%',
      data: {user: this.user.id}
    });
  }
  async showBakers() {
    const dialogRef = this.dialog.open(HomeBakersComponent, {
      width: '60%',
      data: {user: this.user.id}
    });
  }
  async showBaked() {
    const dialogRef = this.dialog.open(HomeBakedComponent, {
      width: '60%',
      data: {user: this.user.id}
    });
  }

}
