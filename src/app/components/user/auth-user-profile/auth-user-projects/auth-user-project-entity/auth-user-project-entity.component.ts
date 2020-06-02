import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../models/project/project';
import {ProjectService} from '../../../../../services/project/project.service';
import {LikeService} from '../../../../../services/like.service';
import {ProjectLike} from '../../../../../models/project/projectLike';
import {UserService} from '../../../../../services/user/user.service';
import {SimpleAuthService} from '../../../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth-user-project-entity',
  templateUrl: './auth-user-project-entity.component.html',
  styleUrls: ['./auth-user-project-entity.component.css']
})
export class AuthUserProjectEntityComponent implements OnInit {
 @Input() project: Project;
 authorized = false;
  constructor(
    private projectService: ProjectService,
    private likeService: LikeService,
    private userService: UserService,
    private authService: SimpleAuthService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
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
      this.openSnackBar('Only authorized users can like', 'Close', 'style-warn');
    }
  }

  unlike() {
    if (this.authorized) {
      this.likeService.deleteByIdProjectLike(this.project.id).subscribe(perf => {
        console.log(perf);
        // @ts-ignore
        this.project.likes = this.project.likes.filter(like => like.id !== perf.id);
        this.project.liked = false;
      });
    } else {
      this.openSnackBar('Only authorized users can unlike', 'Close', 'style-warn');
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
