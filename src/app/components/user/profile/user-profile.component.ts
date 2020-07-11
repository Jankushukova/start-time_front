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
    private translator: TranslateService
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
    let text;
    let noFollower;
    this.translator.get('user_profile.followers').subscribe(perf => text = perf);
    this.translator.get('user_profile.no_follower').subscribe(perf => noFollower = perf);
    if (text && noFollower) {
      bootbox.alert({
        title: '<h1><small class="text-muted">' + text + '</small></h1>',
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
          return noFollower;

        },
        size: 'large',
        centerVertical: true,
      });
    }
  }
  async showFollowed() {
    const list: User[] = this.followed;
    let text;
    let noFollowing;
    this.translator.get('user_profile.following').subscribe(perf => text = perf);
    this.translator.get('user_profile.no_following').subscribe(perf => noFollowing = perf);
    if(text && noFollowing){
    bootbox.alert({
      title: '<h1><small class="text-muted">' + text + '</small></h1>',
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
        return noFollowing;

      },
      size: 'large',
      centerVertical: true,
    });
    }
  }
  async showBakers() {
    const list: any[] = this.bakers;
    let text;
    this.translator.get('user_profile.bakers').subscribe(perf => text = perf);
    let noBakers;
    this.translator.get('user_profile.no_bakers').subscribe(perf => noBakers = perf);
    if(text && noBakers) {
      bootbox.alert({
        title: '<h1><small class="text-muted">' + text + '</small></h1>',
        message() {
          if (list.length > 0) {
            let userslist = '<table class="table table-striped">\n' +
              '                      <tbody>\n';
            for (const user of list) {
              userslist += '                        <tr>\n' +
                '                          <td>\n' +
                '                            <div >\n' +
                // tslint:disable-next-line:max-line-length
                '      <h2 ><small class="text-muted"><a style=\'color:inherit\' \>' + ((user.fullname) ? user.fullname : user.firstname + ' ' + user.lastname) + '</a></small></h2>\n' +
                '                            </div>\n' +
                '                          </td>\n' +
                '<td>\n' +
              '                            <div >\n' +
              // tslint:disable-next-line:max-line-length
              '      <h2 ><small class="text-muted"><a style=\'color:inherit\'  >' + user.payment.sum + '</a></small></h2>\n' +
              '                            </div>\n' +
              '                          </td>\n' +
                '<td>\n' +
                '                            <div >\n' +
                // tslint:disable-next-line:max-line-length
                '      <h2 ><small class="text-muted"><a style=\'color:inherit\'  >' + user.project.title_rus + '</a></small></h2>\n' +
                '                            </div>\n' +
                '                          </td>\n' +
                '                        </tr>\n';

            }
            userslist += '                      </tbody>\n' +
              '                    </table>';

            return userslist;
          }
          return noBakers;

        },
        size: 'large',
        centerVertical: true,
      });
    }
  }
  async showBaked() {
    const list: Project[] = this.baked;
    let text;
    let noBaked;
    this.translator.get('user_profile.bakes').subscribe(perf => {
      text = perf;
    });
    this.translator.get('user_profile.no_bakes').subscribe(perf => {
      noBaked = perf;
    });
    if(text && noBaked) {
    bootbox.alert({
      title: '<h1><small class="text-muted">' + text + '</small></h1>',
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
        return noBaked;

      },
      size: 'large',
      centerVertical: true,
    });
  }
  }

}
