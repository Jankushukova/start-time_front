import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {ProjectService} from "../../../../services/project/project.service";
import {UserService} from "../../../../services/user/user.service";
import {User} from "../../../../models/user/user";

@Component({
  selector: 'app-auth-user-profile',
  templateUrl: './auth-user-profile.component.html',
  styleUrls: ['./auth-user-profile.component.css']
})
export class AuthUserProfileComponent implements OnInit {
  user: User;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.userService.findById(parseInt(route.snapshot.paramMap.get('id'))).subscribe(perf => {
          this.user = perf;

        });
      }
    })
  }

  ngOnInit(): void {

  }


  onActivate(componentReference) {
    componentReference.someFunction(this.user);
  }


  async showFollowers(followers: User[]) {
    bootbox.alert({
      title: "<p class='display-5'>Followers</p>",
      message: function () {
        if (followers.length > 0) {
          let followerslist = "<table class=\"table table-striped\">\n" +
            "                      <tbody>\n";
          for (let follower of followers) {
            followerslist += "                        <tr>\n" +
              "                          <td>\n" +
              "                            <div >\n" +
              "      <p class='display-5'><a style='color:inherit' href='/user/userProfile/" + follower.id + "' >" + follower.firstname+ " " + follower.lastname + "</a></p>\n" +
              "                            </div>\n" +
              "                          </td>\n" +
              "                        </tr>\n"

          }
          followerslist += "                      </tbody>\n" +
            "                    </table>";

          return followerslist;
        }
        return "This user does not have followers yet ";

      },
      size: 'large',
      centerVertical: true,
    });
  }


}
