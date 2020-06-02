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
  bakers: User[] = [];
  baked: Project[] = [];
  constructor(
    private userService: UserService,
    private projectService: ProjectService,
    private followerService: FollowerService,
    private projectOrderService: ProjectOrderService,
    private authService: SimpleAuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.authorized$.subscribe(res => {
      this.authorized = res;
    });

    this.userService.getProfileInformation().subscribe(perf => {
        this.user = perf;
        // tslint:disable-next-line:no-shadowed-variable
        this.followerService.getFollowersOfUser(this.user.id).subscribe(perf => {
          this.followers = perf;
        });
        // tslint:disable-next-line:no-shadowed-variable
        this.followerService.getFollowedOfUser(this.user.id).subscribe(perf => {
          this.followed = perf;
        });
        // tslint:disable-next-line:no-shadowed-variable
        this.projectOrderService.getBakersOfUser(this.user.id).subscribe(perf => {
          this.bakers = perf;
        });
        // tslint:disable-next-line:no-shadowed-variable
        this.projectService.getBakedProjectsOfUser(this.user.id).subscribe(perf => {
          this.baked = perf;
        });
      });
  }
  changeClass(element) {
    this.num = element;
  }


  async showFollowers() {
    const list: User[] = this.followers;
    bootbox.alert({
      title: '<h1><small class="text-muted">My followers</small></h1>',
      message: () => {
        if (list.length > 0) {
          let followerslist = '<table class=\"table table-striped\">\n' +
            '                      <tbody>\n';
          for (const follower of list) {
            followerslist += '                        <tr>\n' +
              '                          <td>\n' +
              '                            <div >\n' +
              // tslint:disable-next-line:max-line-length
              '      <h2 ><small class="text-muted"><a style=\'color:inherit\' href=\'/user/userProfile/' + follower.id + '\' >' + follower.getFullName() + '</a></small></h2>\n' +
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
  async showFollowed() {
    const list: User[] = this.followed;
    bootbox.alert({
      title: '<h1><small class="text-muted">My subscriptions</small></h1>',
      message() {
        if (list.length > 0) {
          let followedlist = '<table class="table table-striped">\n' +
            '                      <tbody>\n';
          for (const followed of list) {
            followedlist += '                        <tr>\n' +
              '                          <td>\n' +
              '                            <div >\n' +
              // tslint:disable-next-line:max-line-length
              '      <h2 ><small class="text-muted"><a style=\'color:inherit\' href=\'/user/userProfile/' + followed.id + '\' >' + followed.getFullName() + '</a></small></h2>\n' +
              '                            </div>\n' +
              '                          </td>\n' +
              '                        </tr>\n';

          }
          followedlist += '                      </tbody>\n' +
            '                    </table>';

          return followedlist;
        }
        return 'You does not follow anyone yet ';

      },
      size: 'large',
      centerVertical: true,
    });
  }
  async showBakers() {
    const list: User[] = this.bakers;
    bootbox.alert({
      title: '<h1><small class="text-muted">Users baked my projects</small></h1>',
      message() {
        if (list.length > 0) {
          let userslist = '<table class="table table-striped">\n' +
            '                      <tbody>\n';
          for (const user of list) {
            userslist += '                        <tr>\n' +
              '                          <td>\n' +
              '                            <div >\n' +
              // tslint:disable-next-line:max-line-length
              '      <h2 ><small class="text-muted"><a style=\'color:inherit\' href=\'/user/userProfile/' + user.id + '\' >' + user.getFullName() + '</a></small></h2>\n' +
              '                            </div>\n' +
              '                          </td>\n' +
              '                        </tr>\n';

          }
          userslist += '                      </tbody>\n' +
            '                    </table>';

          return userslist;
        }
        return 'You do not have bakers yet ';

      },
      size: 'large',
      centerVertical: true,
    });
  }
  async showBaked() {
    const list: Project[] = this.baked;
    bootbox.alert({
      title: '<h1><small class="text-muted">Projects</small></h1>',
      message() {
        if (list.length > 0) {
          let projectslist = '<table class="table table-striped">\n' +
            '                      <tbody>\n';
          for (const project of list) {
            projectslist += '                        <tr>\n' +
              '                          <td>\n' +
              '                            <div >\n' +
              // tslint:disable-next-line:max-line-length
              '      <h2 ><small class="text-muted"><a style=\'color:inherit\' href=\'/user/project/details/' + project.id + '\' >' + project.title_rus + '</a></small></h2>\n' +
              '                            </div>\n' +
              '                          </td>\n' +
              '                        </tr>\n';

          }
          projectslist += '                      </tbody>\n' +
            '                    </table>';

          return projectslist;
        }
        return 'You do not bake any project yet';

      },
      size: 'large',
      centerVertical: true,
    });
  }

}
