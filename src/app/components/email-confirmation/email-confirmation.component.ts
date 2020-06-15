import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {SimpleAuthService} from '../../services/auth.service';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.css']
})
export class EmailConfirmationComponent implements OnInit {
  private confirmationUrl = '';
  success = false;
  constructor( private route: ActivatedRoute,
               private http: HttpClient,
               private authService: SimpleAuthService,
               private userService: UserService,
               private router: Router
               ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.confirmationUrl = params.queryURL;
      this.http.get(this.confirmationUrl).subscribe((perf: any) => {
        this.router.navigate(['/login'], {queryParams: {emailConfirmed: true}});
      });
    });
  }

}
