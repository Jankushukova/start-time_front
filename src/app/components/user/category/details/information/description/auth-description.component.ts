import {AfterViewInit, Component, Input, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {TranslateService} from "@ngx-translate/core";
import {DomSanitizer} from "@angular/platform-browser";
import { Meta } from '@angular/platform-browser';

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
  href = 'https://start-time.kz';

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
    private meta: Meta

  ) {



  }

  ngOnInit(): void {
    this.translate = this.translator;
    this.href = 'https://start-time.kz/project/details/'+ this.project.id +'/description';
    this.meta.updateTag(
      { name: 'url', content: 'https://start-time.kz/project/details/'+ this.project.id +'/description' },
      'name=url'
    );

    this.meta.updateTag(
      { name: 'title', content: (this.translator.currentLang == 'rus') ? this.project.title_rus : (this.translator.currentLang == 'eng') ? this.project.title_eng : this.project.title_kz },
      'name=title'
    );
    this.meta.updateTag(
      { name: 'description', content: (this.translator.currentLang == 'rus') ? this.project.description_rus : (this.translator.currentLang == 'eng') ? this.project.description_eng : this.project.description_kz },
      'name=description'
    );
    this.meta.updateTag(
      { name: 'image', content: this.project.images[0].image},
      'name=image'

    );

  }

  transformYourHtml(htmlTextWithStyle) {
    return this.sanitizer.bypassSecurityTrustHtml(htmlTextWithStyle);
  }

}
