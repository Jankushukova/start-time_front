import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {CommentLike} from '../models/commentLike';
import {ProjectLike} from '../models/project/projectLike';
import {NewsLike} from '../models/news/newsLike';
import {ProjectImage} from '../models/project/projectImage';
import {map} from 'rxjs/operators';
import {News} from '../models/news/news';
import {ProductLike} from "../models/product/productLike";

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  commentUrl = environment.apiUrl + "/api/v1/comment/like";
  projectUrl = environment.apiUrl + "/api/v1/project/like";
  newsUrl = environment.apiUrl + "/api/v1/news/like";
  productUrl = environment.apiUrl + "/api/v1/product/like";

  constructor(public http: HttpClient) {
  }



  //comment
//+
  public getLikesOfComment(id: number): Observable<CommentLike[]> {
    return this.http.get<CommentLike[]>( `${this.commentUrl }/${id}`).pipe(
      map(data => data.map(data => new CommentLike().deserialize(data)))
    );
  }


  //+
  public createCommentLike(like: CommentLike): Observable<CommentLike> {
    return this.http.post<CommentLike>(this.commentUrl, like);
  }

  //+
  public deleteByIdCommentLike(id: number):Observable<any> {
    return this.http.delete<CommentLike>(`${this.commentUrl}/${id}`);
  }

  //project
  //+
  public getLikesOfProject(id: number): Observable<ProjectLike[]> {
    return this.http.get<ProjectImage[]>( `${this.projectUrl }/${id}`).pipe(
      map(data => data.map(data => new ProjectLike().deserialize(data)))
    );
  }

  //+
  public createProjectLike(like: ProjectLike): Observable<ProjectLike> {
    return this.http.post<ProjectLike>(this.projectUrl, like);
  }

  //+
  public deleteByIdProjectLike(id: number):Observable<{}> {
    return this.http.delete(`${this.projectUrl}/${id}`);
  }

  //news

  public getLikesOfNews(id: number): Observable<NewsLike[]> {
    return this.http.get<NewsLike[]>( `${this.newsUrl }/${id}`).pipe(
      map(data => data.map(data => new NewsLike().deserialize(data)))
    );
  }

  //+
  public createNewsLike(like: NewsLike): Observable<NewsLike> {
    return this.http.post<NewsLike>(this.newsUrl, like);
  }

  //+
  public deleteByIdNewsLike(id: number) {
    return this.http.delete(`${this.newsUrl}/${id}`);
  }

  //product

  public getLikesOfProduct(id: number): Observable<ProductLike[]> {
    return this.http.get<ProductLike[]>( `${this.productUrl }/${id}`).pipe(
      map(data => data.map(data => new ProductLike().deserialize(data)))
    );
  }

  //+
  public createProductLike(like: ProductLike): Observable<ProductLike> {
    return this.http.post<ProductLike>(this.productUrl, like);
  }

  //+
  public deleteByIdProductLike(id: number) {
    return this.http.delete(`${this.productUrl}/${id}`);
  }
}
