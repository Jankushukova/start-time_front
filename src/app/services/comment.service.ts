import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {ProjectComment} from '../models/project/projectComment';
import {NewsComment} from '../models/news/newsComment';
import {Payment} from '../models/payment';
import {map} from 'rxjs/operators';
import {News} from '../models/news/news';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  projectUrl = environment.apiUrl + '/api/v1/project/comment';
  newsUrl = environment.apiUrl + '/api/v1/news/comment';

  constructor(public http: HttpClient) { }

  //comment for project
  public getCommentsOfProject(id: number): Observable<ProjectComment[]> {
    return this.http.get<ProjectComment[]>( `${this.projectUrl }s/${id}`).pipe(
      map(data => data.map(data => new ProjectComment().deserialize(data)))
    );
  }
  public getCommentsOfProjectAuth(id: number): Observable<ProjectComment[]> {
    return this.http.get<ProjectComment[]>( `${this.projectUrl }/${id}`).pipe(
      map(data => data.map(data => new ProjectComment().deserialize(data)))
    );
  }

  //+
  public createProjectComment(comment: ProjectComment): Observable<ProjectComment> {
    return this.http.post<ProjectComment>(this.projectUrl, comment).pipe(
      map(data => new ProjectComment().deserialize(data)));
  }

  //+
  public deleteByIdProjectComment(id: number) {
    return this.http.delete(`${this.projectUrl}/${id}`);
  }







  //comment for news
//+

  public getCommentsOfNews(id: number): Observable<NewsComment[]> {
    return this.http.get<NewsComment[]>( `${this.newsUrl }/${id}`).pipe(
      map(data => data.map(data => new NewsComment().deserialize(data)))
    );
  }
  public create(comment: NewsComment): Observable<NewsComment> {
    return this.http.post<NewsComment>(this.newsUrl, comment);
  }

//+
  public deleteById(id: number) {
    return this.http.delete(`${this.newsUrl}/${id}`);
  }
}
