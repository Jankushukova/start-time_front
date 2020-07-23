import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {FollowerService} from "../../../../services/user/follower.service";

@Component({
  selector: 'app-home-followed',
  templateUrl: './home-followed.component.html',
  styleUrls: ['./home-followed.component.css']
})
export class HomeFollowedComponent implements OnInit {
  followed: User[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private followerService: FollowerService
  ) {

  }

  ngOnInit(): void {
    this.followerService.getFollowedOfUser(this.data.user).subscribe(perf => {
      this.followed = perf;
    })
  }

}
