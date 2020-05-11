import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateService} from "../../../../../../../../services/project/update.service";
import {Update} from "../../../../../../../../models/project/update";
import {SlickCarouselComponent} from "ngx-slick-carousel";

@Component({
  selector: 'app-auth-update-details',
  templateUrl: './auth-update-details.component.html',
  styleUrls: ['./auth-update-details.component.css']
})
export class AuthUpdateDetailsComponent implements OnInit {
  update:Update;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;


  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };


  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private updateService:UpdateService
  ) { }

  ngOnInit(): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.updateService.findById(id).subscribe(perf=>{
      console.log(perf);
      this.update = perf;
    })
  }
  someFunction(data){

  }
}