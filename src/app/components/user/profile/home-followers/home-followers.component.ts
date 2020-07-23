import {Component, Inject, OnInit} from '@angular/core';
import {User} from "../../../../models/user/user";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserService} from "../../../../services/user/user.service";
import {FollowerService} from "../../../../services/user/follower.service";

@Component({
  selector: 'app-home-followers',
  templateUrl: './home-followers.component.html',
  styleUrls: ['./home-followers.component.css']
})
export class HomeFollowersComponent implements OnInit {
  followers: User[] = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private followerService: FollowerService
  ) {

  }

  ngOnInit(): void {
    this.followerService.getFollowersOfUser(this.data.user).subscribe(perf => {
      this.followers = perf;
    })
  }

}
