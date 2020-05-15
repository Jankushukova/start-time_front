import { Component, OnInit } from '@angular/core';
import {News} from "../../../../models/news/news";
import {NewsService} from "../../../../services/news/news.service";

@Component({
  selector: 'app-news',
  templateUrl: './auth-news.component.html',
  styleUrls: ['./auth-news.component.css']
})
export class AuthNewsComponent implements OnInit {
  news: News[];
  constructor(
    private newsService:NewsService
  ) { }

  ngOnInit(): void {
    this.newsService.getNews().subscribe(perf=>{
      this.news = perf;
    })
  }

}
