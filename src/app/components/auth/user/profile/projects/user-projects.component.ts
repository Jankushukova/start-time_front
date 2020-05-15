import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../../../services/project/project.service";
import {Project} from "../../../../../models/project/project";
import {ProjectLike} from "../../../../../models/project/projectLike";
import {UserService} from "../../../../../services/user/user.service";
import {LikeService} from "../../../../../services/like.service";
import {User} from "../../../../../models/user/user";

@Component({
  selector: 'app-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent implements OnInit {
  projects:Project[];
  progress = 0;
  safeURL;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService:ProjectService,
    private userService:UserService,
    private likeService:LikeService

  ) { }

  ngOnInit(): void {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id'));

    this.projectService.getProjectsOfUser(id).subscribe(perf=>{
      this.projects = perf;

    })
  }

  like(project:Project){
    let like:ProjectLike = new ProjectLike();
    like.user_id = this.userService.getUser().id;
    like.project_id = project.id;

    this.likeService.createProjectLike(like).subscribe(perf=>{
      // @ts-ignore
      project.likes.push(perf);
      project.liked = true;
    })
  }

  unlike(project:Project){
    this.likeService.deleteByIdProjectLike(project.id).subscribe(perf=>{
      // @ts-ignore
      project.likes = project.likes.filter(like => like.id!=perf.id);
      project.liked = false;


    })
  }

  async showBakers(project:Project) {
    const list:User[] = project.bakers;
    bootbox.alert({
      title: "<p class='display-5'>Bakers of project</p>",
      message: function () {
        if (list.length > 0) {
          let bakerslist = "<table class=\"table table-striped\">\n" +
            "                      <tbody>\n";
          for (let baker of list) {
            bakerslist += "                        <tr>\n" +
              "                          <td>\n" +
              "                            <div >\n" +
              "      <p class='display-5'><a style='color:inherit' href='/user/userProfile/" + baker.id + "' >" + baker.firstname + " " + baker.lastname + "</a></p>\n" +
              "                            </div>\n" +
              "                          </td>\n" +
              "                        </tr>\n"

          }
          bakerslist += "                      </tbody>\n" +
            "                    </table>";

          return bakerslist;
        }
        return "Nobody baked this project ";

      },
      size: 'large',
      centerVertical: true,
    });
  }


}
