import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from './services/user/user.service';
import {ProjectCategory} from './models/project/projectCategory';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {SimpleAuthService} from './services/auth.service';
import {OrderProductsService} from './services/product/order-products.service';
import {ProjectCategoryService} from './services/project/project-category.service';
import {AuthService} from 'angularx-social-login';
import {TranslateService} from '@ngx-translate/core';
// @ts-ignore
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }
  ngOnInit(): void {
  }
}
