import { Component, OnInit } from '@angular/core';
import {News} from '../../../models/news/news';
import {NewsService} from '../../../services/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './auth-news.component.html',
  styleUrls: ['./auth-news.component.css']
})
export class AuthNewsComponent implements OnInit {
  news: News[];
  page = 1;
  perPageCount = 12;
  totalNewsCount: number;
  constructor(
    private newsService: NewsService
  ) { }

  ngOnInit(): void {
    this.changeNews();
  }
  changeNews() {
    this.news = null;
    this.newsService.getNews(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalNewsCount = perf.total;
      this.news = perf.data.map(data => new News().deserialize(data));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeNews();
  }

}
