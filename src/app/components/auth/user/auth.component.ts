import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import * as $ from 'jquery';
import {UserService} from '../../../services/user/user.service';
import {AuthService} from '../../../services/auth.service';
import {User} from '../../../models/user/user';
import {ProjectCategory} from '../../../models/project/projectCategory';
import {ProjectCategoryService} from '../../../services/project/project-category.service';
import {SlickCarouselComponent} from 'ngx-slick-carousel';

@Component({
  selector: 'app-unauth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
    num = 1;
    authorized = false;
    user: User = null;
    categories: ProjectCategory[] = [];
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private projectCategory: ProjectCategoryService,
    private router: Router) { }

  ngOnInit(): void {
    console.log(this.authService.getToken());
    if (!this.userService.isAuthorized()) {
      this.router.navigateByUrl('/start/login');
    }
    else{
      this.projectCategory.get().subscribe(perf =>{
        this.categories = perf;
      })
      jQuery('.dropdown-toggle').on('click', (e) =>  {
        $(this).next().toggle();
      });
      jQuery('.dropdown-menu.keep-open').on('click',  (e) =>  {
        e.stopPropagation();
      });


      this.user =  this.userService.getUser();
    }

  }

  Logout() {
    this.userService.logout();
    this.router.navigateByUrl('/');

  }
  getDate(){
    const date:Date = new Date();
    return date.getFullYear();
  }

  title = 'ngSlick';


  slides = [342, 453, 846, 855, 234, 564, 744, 243];



  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots":true,
    "nextArrow": "<div class='nav-btn next-slide'> </div>",
    "prevArrow": "<div class='nav-btn prev-slide'> </div>",
    "infinite": false
  };



  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
