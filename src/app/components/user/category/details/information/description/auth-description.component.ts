import {Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'app-description',
  templateUrl: './auth-description.component.html',
  styleUrls: ['./auth-description.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AuthDescriptionComponent implements OnInit {
  @Input() project: Project;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  translate;

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false
  };

  constructor(
    private translator: TranslateService,
    private sanitizer: DomSanitizer,
  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
  }
  transformYourHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

}
