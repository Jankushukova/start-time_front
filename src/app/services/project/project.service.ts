import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user/user';
import {Observable} from 'rxjs';
import {Project} from '../../models/project/project';
import {SimpleAuthService} from '../auth.service';
import {ProjectOrder} from '../../models/project/projectOrder';
import {map} from 'rxjs/operators';
import {ProjectImage} from '../../models/project/projectImage';
import {ProjectQuestion} from '../../models/project/projectQuestion';
import {Product} from '../../models/product/product';
import {ProjectComment} from '../../models/project/projectComment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  mainUrl = environment.apiUrl + '/api/v1/project';
  customUrl = environment.apiUrl + '/api/v1/';

  constructor(public http: HttpClient,
              public authService: SimpleAuthService
              ) { }


  // +
  public getStatisticsProject(): Observable<number> {
    return this.http.get<number>(`${this.customUrl}statistics/project`);
  }// +
  public getStatisticsSuccessfulProject(): Observable<number> {
    return this.http.get<number>(`${this.customUrl}statistics/project/successful`);
  }

  // +
  public getStatisticsBackers(): Observable<number> {
    return this.http.get<number>(`${this.customUrl}statistics/project/bakers`);
  }



  // +
  public getBakersOfProject(id: number): Observable<User[]> {
    return this.http.get<User[]>( `${this.mainUrl }/bakers/${id}`).pipe(
      map(data => data.map(entryData => new User().deserialize(entryData)))
    );
  }

  // +
  public getAllBakers(perPageCount: number, pageNumber: number): Observable<User[]> {
    return this.http.get<User[]>( `${this.mainUrl }/bakers/all`, {
      // @ts-ignore
      params: {
        page: pageNumber,
        perPage: perPageCount
      }
    });
  }
  // +
  public getBakedProjectsOfUser(id: number): Observable<Project[]> {
    return this.http.get<Project[]>( `${this.mainUrl }s/user/baked/${id}`).pipe(
      map(data => data.map(entryData => new Project().deserialize(entryData)))
    );
  }
  // +
  public getProjectsOfUser(userId: number, perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.customUrl}user/projects`, {
      // @ts-ignore
      params: {
        id: userId,
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public getProjectsOfCategory(categoryId: number, perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/category`, {
      // @ts-ignore
      params: {
        category_id: categoryId,
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }

  // +
  public getMostPopular(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/popular`).pipe(
      map(data => data.map(entryData => new Project().deserialize(entryData)))
    );
  }

  // +
  public getAllProjects(perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }


  // +
  public createProjectImages(images: any): Observable<ProjectImage> {
    return this.http.post<ProjectImage>( `${this.mainUrl}/create/images`, images);
  }
  // +
  public getImagesOfProject(id: number): Observable<ProjectImage[]> {
    return this.http.get<ProjectImage[]>( `${this.mainUrl }/images/${id}`).pipe(
      map(data => data.map(entryData => new ProjectImage().deserialize(entryData)))
    );
  }

  // +
  public getQuestionsOfProject(id: number): Observable<ProjectQuestion[]> {
    return this.http.get<ProjectQuestion[]>( `${this.mainUrl }/questions/${id}`).pipe(
      map(data => data.map(entryData => new ProjectQuestion().deserialize(entryData)))
    );
  }
  // +
  public createProjectQuestion(comment: ProjectQuestion): Observable<ProjectQuestion> {
    return this.http.post<ProjectQuestion>(`${this.mainUrl}/questions`, comment).pipe(
      map(data => new ProjectQuestion().deserialize(data)));
  }

  // +
  public deleteByIdProjectQuestion(id: number) {
    return this.http.delete(`${this.mainUrl}/questions/${id}`);
  }


// +
  public create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.mainUrl, project);
  }

  // +
  public addView(id: number): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/view/add`, {project_id: id});
  }
// +
  public findById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.mainUrl}/${id}`).pipe(
      map(data => {
          return new Project().deserialize(data); }));
  }
  // +
  public update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.mainUrl}/${id}`, project);
  }
// +
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }

}
