import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../../../../../../models/project/project';
import {SlickCarouselComponent} from "ngx-slick-carousel";

@Component({
  selector: 'app-description',
  templateUrl: './auth-description.component.html',
  styleUrls: ['./auth-description.component.css']
})
export class AuthDescriptionComponent implements OnInit {
  project:Project;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;


  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };

  constructor() { }

  ngOnInit(): void {
  }

  someFunction(data){
   this.project = data;

  }

}
