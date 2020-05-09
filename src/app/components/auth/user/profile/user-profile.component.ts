import { Component, OnInit } from '@angular/core';
import {User} from '../../../../models/user/user';
import {UserService} from '../../../../services/user/user.service';
import {Project} from '../../../../models/project/project';
import {Follower} from '../../../../models/user/follower';
import {ProjectOrder} from '../../../../models/project/projectOrder';
import {ProjectService} from '../../../../services/project/project.service';
import {FollowerService} from '../../../../services/user/follower.service';
import {ProjectOrderService} from '../../../../services/project/project-order.service';

@Component({
  selector: 'app-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  num = 1;
  user: User;
  projects: Project[] = [];
  followers: Follower[] = [];
  followed: Follower[] = [];
  bakers: User[] = [];
  baked: Project[] = [];
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private followerService: FollowerService,
    private projectOrderService: ProjectOrderService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.projectService.getProjectsOfUser(this.user.id).subscribe(perf =>{
      this.projects = perf;
    });
    this.followerService.getFollowersOfUser(this.user.id).subscribe(perf =>{
      this.followers = perf;
    });
    this.followerService.getFollowedOfUser(this.user.id).subscribe(perf =>{
      this.followed = perf;
    });

    this.projectOrderService.getBakersOfUser(this.user.id).subscribe(perf =>{
      this.bakers = perf;
    });
    this.projectService.getBakedProjectsOfUser(this.user.id).subscribe(perf =>{
      this.baked = perf;
    });



  }
  changeClass(element) {
    this.num = element;
  }

}
