import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectCategory} from "../../../../models/project/projectCategory";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectCategoryService} from "../../../../services/project/project-category.service";
import {News} from "../../../../models/news/news";
import {NewsService} from "../../../../services/news/news.service";
import {ProjectImage} from "../../../../models/project/projectImage";
import {NewsImage} from "../../../../models/news/newsImage";

@Component({
  selector: 'app-create-news',
  templateUrl: './create-news.component.html',
  styleUrls: ['./create-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  newsForm: FormGroup;
  news: News;
  images: FormData = new FormData();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private newsService: NewsService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initNewsForm();
    if ( this.data.newsId) {
      this.newsService.findById(this.data.newsId).subscribe(perf => {
        this.news = perf;
        this.bindOldNewsValues();
      });
    }
  }
  bindOldNewsValues() {
    this.newsForm.patchValue({
      title: this.news.title,
      description: this.news.description,
      content: this.news.content
    });
    console.log(this.news);
    for (let i = 0; i < this.news.images.length; i++) {
      this.images.append('image' + ( i + 1), this.news.images[i].image);
    }
  }
  ImageAddedEvent(fileInput: Event) {
    // @ts-ignore
    const files = fileInput.target.files;
    for (let i = 0; i < files.length; i++) {
      const image: ProjectImage = new ProjectImage();
      image.image = files[i];
      this.images.append('image' + ( i + 1 + ((this.news) ? this.news.images.length : 0)), image.image);
      console.log(this.images);
    }

  }
  initNewsForm() {
    console.log(this.news);
    this.newsForm = this.builder.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required]],
      content: ['', [Validators.required]],
    });
  }
  onSubmitNewsForm() {
    if (!this.news) {
      const news: News = this.newsForm.getRawValue();
      this.newsService.create(news).subscribe((perf: News) => {
        this.images.append('news_id', (perf.id).toString());
        this.newsService.createNewsImages(this.images).subscribe((perf2: any) => {
          news.images = perf2.map( data => new NewsImage().deserialize(data));
        });
        let allNews: News[] = [];
        this.newsService.news$.subscribe(res => allNews = res);
        news.likes = [];
        allNews.push(news);
        allNews.sort().reverse();
        this.newsService.changeNews(allNews);
        console.log(allNews);
      });
    } else {
      this.news.title = this.newsForm.controls.title.value;
      this.news.description = this.newsForm.controls.description.value;
      this.news.content = this.newsForm.controls.content.value;
      this.newsService.update(this.news.id, this.news).subscribe(perf => {
        this.images.append('news_id', (perf.id).toString());
        this.newsService.createNewsImages(this.images).subscribe((perf2: any) => {
          this.news.images = perf2.map( data => new NewsImage().deserialize(data));
        });
        console.log(this.news);
        let allNews: News[] = [];
        this.newsService.news$.subscribe(res => {
          allNews = res;
        });
        allNews = allNews.map( data =>  {
          if (data.id === this.news.id) {
            return this.news;
          }
          return data;
        });
        console.log(allNews);
        this.newsService.changeNews(allNews);
        this.newsService.changeEditNews(false);
      });
    }

    console.log('create category');
  }
}
