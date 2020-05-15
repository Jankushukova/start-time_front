import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {News} from '../../models/news/news';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {NewsImage} from '../../models/news/newsImage';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  mainUrl = environment.apiUrl + "/api/v1/news";

  constructor(public http: HttpClient) {
  }

  //+
  public addView(id: number): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/view/add`, {"news_id":id});
  }

//+
  public getNews(): Observable<News[]> {
    return this.http.get<News[]>( this.mainUrl ).pipe(
      map(data => data.map(data => new News().deserialize(data)))
    );
  }
//+
  public getImagesOfNews(id: number): Observable<NewsImage[]> {
    return this.http.get<NewsImage[]>( `${this.mainUrl}/images/${id}`).pipe(
      map(data => data.map(data => new NewsImage().deserialize(data)))
    );
  }
//+

  public create(news: News): Observable<News> {
    return this.http.post<News>(this.mainUrl, news);
  }
//+
  public findById(id: number): Observable<News> {
    return this.http.get<News>(`${this.mainUrl}/${id}`);
  }
//+
  public update(id: number, news: News): Observable<News> {
    return this.http.put<News>(`${this.mainUrl}/${id}`, news);
  }
//+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
