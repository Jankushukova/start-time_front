import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {ProjectService} from '../../../services/project/project.service';
import {UserService} from '../../../services/user/user.service';
import {User} from '../../../models/user/user';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FollowerService} from '../../../services/user/follower.service';
import {Follower} from '../../../models/user/follower';
import {SimpleAuthService} from '../../../services/auth.service';

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
    private followerService: FollowerService
  ) {
  }
  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'), 10);
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    this.userInit();

    if (this.authorized) {
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
    bootbox.alert({
      title: '<p class=\'display-5\'>Followers</p>',
      message() {
        if (followers.length > 0) {
          let followerslist = '<table class="table table-striped">\n' +
            '                      <tbody>\n';
          for (const follower of followers) {
            followerslist += '                        <tr>\n' +
              '                          <td>\n' +
              '                            <div >\n' +
              // tslint:disable-next-line:max-line-length
              '      <p class=\'display-5\'><a style=\'color:inherit\' href=\'/user/userProfile/' + follower.id + '\' >' + follower.firstname + ' ' + follower.lastname + '</a></p>\n' +
              '                            </div>\n' +
              '                          </td>\n' +
              '                        </tr>\n';

          }
          followerslist += '                      </tbody>\n' +
            '                    </table>';

          return followerslist;
        }
        return 'This user does not have followers yet ';

      },
      size: 'large',
      centerVertical: true,
    });
  }

  follow() {
    if (this.authorized) {
      if (!this.following) {
        const follower = new Follower();
        follower.followed_id = this.user.id;
        follower.following_id = this.userService.getUser().id;
        this.followerService.create(follower).subscribe(perf => {
          console.log(perf);
          this.openSnackBar('Successfully followed', 'Close', 'style-success');
          this.following = true;
          this.user.followers.push(new User().deserialize(perf));
        });
      } else {
        this.followerService.deleteById(this.user.id).subscribe( perf => {
          console.log(perf);
          this.user.followers = this.user.followers.filter(user => user.id !== this.userService.getUser().id);
          this.following = false;
        });
      }
    } else {
      this.openSnackBar('Only authorized users can follow', 'Close', 'style-warn');
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
