import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user/user.service';
import * as $ from 'jquery';
import {Router} from '@angular/router';
import {SimpleAuthService} from '../../services/auth.service';
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  privelegedUser;
  trans;
  constructor(private userService: UserService,
              private router: Router,
              private authService: SimpleAuthService,
              private translate: TranslateService
              ) { }
  ngOnInit(): void {
    if (!this.userService.isAdmin()) {
      this.router.navigateByUrl('/');
    } else {
      this.privelegedUser = this.userService.getUser();
      this.langInit();
    }
  }
  langInit() {
    this.translate.addLangs(['eng', 'rus', 'kz']);
    this.translate.setDefaultLang('rus');
    const  browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|rus/) ? browserLang : 'rus');
    this.trans = this.translate;
  }
  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/start-time/moderator');
  }

  getDate() {
    const date: Date = new Date();
    return date.getFullYear();
  }
}
