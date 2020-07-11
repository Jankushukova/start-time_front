import {Component, OnInit, ViewChild} from '@angular/core';
import {SlickCarouselComponent} from "ngx-slick-carousel";
import {Project} from "../../../models/project/project";
import {ProjectService} from "../../../services/project/project.service";
import {Product} from "../../../models/product/product";
import {AuthProductDetailsComponent} from "../../user/shop/product-details/auth-product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {AddPopularComponent} from "./add-popular/add-popular.component";

@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.css']
})
export class AdminMainComponent implements OnInit {
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    nextArrow: '<div class=\'nav-btn next-slide\'> </div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'> </div>',
    infinite: false
  };
  projects: Project[] = [];
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.projectService.activeProjects$.subscribe(perf => {
      this.projects = perf;
    });
    this.projectService.getPopularProjects().subscribe(perf => {
      this.projectService.changeActiveProjects(perf.map(data => new Project().deserialize(data)));
    });
    $(document).ready(() => {
      const ua = navigator.userAgent;

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
        $('a.mobile-other').show();
        this.slideConfig.slidesToShow = 1;
      } else if (/Chrome/i.test(ua)) {
        $('a.chrome').show();
        this.slideConfig.slidesToShow = 5;
      } else {
        $('a.desktop-other').show();
      }
    });
  }
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

  daysLeft(project: Project) {
    const deadline = project.deadline;
    const d1 = new Date(deadline);
    const d2 = new Date();
    const dif = d1.getTime() - d2.getTime();
    const days = dif / (1000 * 3600 * 24);
    return Math.ceil(days);
  }
  openDialog() {
    const dialogRef = this.dialog.open(AddPopularComponent, {
      width: '60%'
    });
  }
}
