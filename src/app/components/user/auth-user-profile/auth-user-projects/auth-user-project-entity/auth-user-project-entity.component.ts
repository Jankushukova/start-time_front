import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../models/project/project';
import {ProjectService} from '../../../../../services/project/project.service';
import {LikeService} from '../../../../../services/like.service';
import {ProjectLike} from '../../../../../models/project/projectLike';
import {UserService} from '../../../../../services/user/user.service';
import {SimpleAuthService} from '../../../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-user-project-entity',
  templateUrl: './auth-user-project-entity.component.html',
  styleUrls: ['./auth-user-project-entity.component.css']
})
export class AuthUserProjectEntityComponent implements OnInit {
 @Input() project: Project;
 authorized = false;
 translate;
  constructor(
    private projectService: ProjectService,
    private likeService: LikeService,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
    });
    this.projectService.findById(this.project.id).subscribe(perf => {
      this.project = perf;
    });
  }

  like() {
    if (this.authorized) {
      const like: ProjectLike = new ProjectLike();
      like.user_id = this.userService.getUser().id;
      like.project_id = this.project.id;

      this.likeService.createProjectLike(like).subscribe(perf => {
        this.project.likes.push(perf);
        this.project.liked = true;
      });
    } else {
      this.translator.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });
    }
  }

  unlike() {
    if (this.authorized) {
      this.likeService.deleteByIdProjectLike(this.project.id).subscribe(perf => {
        // @ts-ignore
        this.project.likes = this.project.likes.filter(like => like.id !== perf.id);
        this.project.liked = false;
      });
    } else {
      this.translator.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });    }
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
  progress(project: Project) {
    return Math.ceil(( parseInt(project.gathered, 10) /  parseInt(project.goal, 10))  * 100 );
  }
  daysLeft(project: Project) {
    const deadline = project.deadline;
    const d1 = new Date(deadline);
    const d2 = new Date();
    const dif = d1.getTime() - d2.getTime();
    const days = dif / (1000 * 3600 * 24);
    return Math.ceil(days);
  }
}
