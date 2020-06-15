import { Component, OnInit } from '@angular/core';
import {ProjectCategoryService} from "../../../services/project/project-category.service";
import {ProjectCategory} from "../../../models/project/projectCategory";
import {News} from "../../../models/news/news";
import {NewsService} from "../../../services/news/news.service";
import {CreateUpdateComponent} from "../../user/category/details/information/update/create-update/create-update.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateNewsComponent} from "./create-news/create-news.component";


@Component({
  selector: 'app-admin-news',
  templateUrl: './admin-news.component.html',
  styleUrls: ['./admin-news.component.css']
})
export class AdminNewsComponent implements OnInit {
  displayedColumns: string[] = ['name'];
  news: News[] = [];
  perPageCount = 12;
  page = 1;
  totalNewsCount;
  EditNews = false;
  DeleteNews = false;
  constructor(
    private newsService: NewsService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.newsService.editNews$.subscribe(perf => this.EditNews = perf);
    this.newsService.news$.subscribe(perf => this.news = perf);
    this.changeNews();
  }

  changeNews() {
    this.news = null;
    this.newsService.getNews(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalNewsCount = perf.total;
      this.newsService.changeNews(perf.data.map(data => new News().deserialize(data)));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeNews();
  }
  configNews(isDelete) {
    if (isDelete) {
      this.DeleteNews = !this.DeleteNews;
    } else {
      this.newsService.changeEditNews(!this.EditNews);
    }
  }

  deleteNews(news: News) {
    this.newsService.deleteById(news.id).subscribe(perf => {
      console.log('deleted');
    });
    let allNews: News[] = [];
    this.newsService.news$.subscribe(perf => allNews = perf);
    allNews = allNews.filter(data => data.id !== news.id);
    this.newsService.changeNews(allNews);
    this.DeleteNews = false;
  }
  addNews() {
    const dialogRef = this.dialog.open(CreateNewsComponent, {
      data: {
      },
      width: '60%'
    });
  }

  updateNews(news: News) {
    const dialogRef = this.dialog.open(CreateNewsComponent, {
      data: {
        newsId: news.id
      },
      width: '60%'
    });
  }

}
