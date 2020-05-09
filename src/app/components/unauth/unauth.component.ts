import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import * as $ from 'jquery';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {ProjectCategory} from '../../models/project/projectCategory';
import {ProjectCategoryService} from '../../services/project/project-category.service';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.css']
})
export class UnauthComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  categories: ProjectCategory[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router,
    private projectCategory: ProjectCategoryService,

  ) { }

  ngOnInit(): void {
    this.projectCategory.get().subscribe(perf =>{
      this.categories = perf;
    })
  }
  changeMenu() {
    // if (document.getElementById('sidebar').style.display === 'block') {
    //   document.getElementById('sidebar').style.display = 'none';
    // } else {
    //   document.getElementById('sidebar').style.display = 'block';
    // }
  }

  show(n: number) {
    alert(n);
  }
  getDate(){
    const date:Date = new Date();
    return date.getFullYear();
  }
  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "dots":true,
    "nextArrow": "<div class='nav-btn next-slide'> </div>",
    "prevArrow": "<div class='nav-btn prev-slide'> </div>",
    "infinite": false
  };



  slickInit(e) {
    console.log('slick initialized');
  }

  breakpoint(e) {
    console.log('breakpoint');
  }

  afterChange(e) {
    console.log('afterChange');
  }

  beforeChange(e) {
    console.log('beforeChange');
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

}
