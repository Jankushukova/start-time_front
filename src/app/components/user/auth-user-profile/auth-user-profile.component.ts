import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../models/user/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FollowerService} from '../../../services/user/follower.service';
import {Follower} from '../../../models/user/follower';
import {SimpleAuthService} from '../../../services/auth.service';
import {TranslateService} from '@ngx-translate/core';
import {HomeFollowersComponent} from "../profile/home-followers/home-followers.component";
import {MatDialog} from "@angular/material/dialog";
import {UserFollowersComponent} from "./user-followers/user-followers.component";

@Component({
  selector: 'app-auth-user-profile',
  templateUrl: './auth-user-profile.component.html',
  styleUrls: ['./auth-user-profile.component.css']
})
export class AuthUserProfileComponent implements OnInit {
  user: User;
  id: number;
  following = false;
  authorized = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private followerService: FollowerService,
    private translate: TranslateService,
    private dialog: MatDialog
  ) {
  }
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.userInit();
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    if (this.authorized && !this.userService.isAdmin()) {
      if (this.id === this.userService.getUser().id) {this.router.navigateByUrl('/home'); }
      this.following = this.user.followers.filter(user => user.id === this.userService.getUser().id).length !== 0;
    }
  }
  userInit() {
    this.userService.findById(this.id).subscribe(perf => {
      this.user = perf;
    });
  }


  onActivate(componentReference) {
    componentReference.shareUserWithChild(this.user);
  }


  async showFollowers(followers: User[]) {
    const dialogRef = this.dialog.open(UserFollowersComponent, {
      width: '60%',
      data: {user: this.user.id}
    });

  }

  follow() {
    if (this.authorized) {
      if (!this.following) {
        const follower = new Follower();
        follower.followed_id = this.user.id;
        follower.following_id = this.userService.getUser().id;
        this.followerService.create(follower).subscribe(perf => {
          this.translate.get('user_profile.follow_success').subscribe(perf2 => {
            this.openSnackBar(perf2, 'Close', 'style-success');
          });
          this.following = true;
          this.user.followers.push(new User().deserialize(perf));
        });
      } else {
        this.followerService.deleteById(this.user.id).subscribe( perf => {
          this.user.followers = this.user.followers.filter(user => user.id !== this.userService.getUser().id);
          this.following = false;
        });
      }
    } else {
      this.translate.get('user_profile.follow_authorized_warning').subscribe(perf2 => {
        this.openSnackBar(perf2, 'Close', 'style-warn');
      });
    }
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
