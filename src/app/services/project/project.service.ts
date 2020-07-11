import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../../models/user/user';
import {BehaviorSubject, Observable} from 'rxjs';
import {Project} from '../../models/project/project';
import {SimpleAuthService} from '../auth.service';
import {ProjectOrder} from '../../models/project/projectOrder';
import {map} from 'rxjs/operators';
import {ProjectImage} from '../../models/project/projectImage';
import {ProjectQuestion} from '../../models/project/projectQuestion';
import {Product} from '../../models/product/product';
import {ProjectComment} from '../../models/project/projectComment';
import {OrdersProduct} from "../../models/product/ordersProduct";
import * as FileSaver from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  mainUrl = environment.apiUrl + '/api/v1/project';
  customUrl = environment.apiUrl + '/api/v1/';
  private comments = new BehaviorSubject([]);
  comments$ = this.comments.asObservable();
  private questions = new BehaviorSubject([]);
  questions$ = this.questions.asObservable();
  private projects = new BehaviorSubject([]);
  projects$ = this.projects.asObservable();
  private activeProjects = new BehaviorSubject([]);
  activeProjects$ = this.activeProjects.asObservable();

  changeActiveProjects(data: Project[]) {
    this.activeProjects.next(data);
  }
  changeComments(data: ProjectComment[]) {
    this.comments.next(data);
  }
  changeQuestions(data: ProjectQuestion[]) {
    this.questions.next(data);
  }
  changeProjects(data: Project[]) {
    this.projects.next(data);
  }
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
  public getStatisticsUsers(): Observable<number> {
    return this.http.get<number>(`${this.customUrl}statistics/users`);
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
  public getActiveProjectsOfUser(perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.customUrl}user/projects/active`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public getActiveProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/active`);
  }
  // +
  public getUnActiveProjectsOfUser(perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.customUrl}user/projects/unactive`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public getFinishedProjectsOfUser(perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.customUrl}user/projects/finished`, {
      // @ts-ignore
      params: {
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
  public getPopularProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}s/popular`).pipe(
      map(data => data.map(entryData => new Project().deserialize(entryData)))
    );
  }
  // +
  public filterProjects(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/filter`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }
  // +
  public filterProjectsByName(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/filter/name`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }
  // +
  public filterProjectOrders(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainUrl}/bakers/filter`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }

  // +
  public getBakersOfBank(bankId: number, perPageCount: number, pageCount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainUrl}/bakers/bank`, {
      // @ts-ignore
      params: {
        id: bankId,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }
  // +
  public getAllProjects(perPageCount: number, pageNumber: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/all`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}s/all`).pipe(
      map(data => data.map(entryData => new Project().deserialize(entryData)))
    );
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
  public createProjectQuestion(question: ProjectQuestion): Observable<ProjectQuestion> {
    return this.http.post<ProjectQuestion>(`${this.mainUrl}/questions`, question).pipe(
      map(data => new ProjectQuestion().deserialize(data)));
  }

  // +
  public updateProjectQuestion(id: number, question: ProjectQuestion): Observable<any> {
    return this.http.put<ProjectQuestion>(`${this.mainUrl}/questions/${id}`, question);
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
  public editPopular(id: number): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/edit/popular`, {project_id: id});
  }

  // +
  public downloadExcel(project): Observable<any> {
    // @ts-ignore
    return this.http.post<any>(`${this.mainUrl}/order/download/excel`, { id: project}, {responseType: 'arraybuffer'});
      // .toPromise()
      // .then(response => this.saveAsBlob(response));
  }
  // +
  public findById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.mainUrl}/${id}`).pipe(
      map(data => {
          return new Project().deserialize(data); }));
  }
  // +
  public findProjectUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.mainUrl}/user/${id}`).pipe(
      map(data => {
        return new User().deserialize(data); }));
  }
  // +
  public update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.mainUrl}/${id}`, project);
  }
  // +
  public changeActiveState(project: Project, state): Observable<any> {
    return this.http.put<Project>(`${this.mainUrl}/change/state`,{id: project.id, state: state});
  }
  // +
  public changeOrderStatus(orderId): Observable<any> {
    return this.http.put<any>(`${this.mainUrl}/order/change/state`, {id: orderId});
  }
// +
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
  // private saveAsBlob(data: any) {
  //   const blob = new Blob([data._body],
  //     { type: 'application/vnd.ms-excel' });
  //   const file = new File([blob], 'report.xls',
  //     { type: 'application/vnd.ms-excel' });
  //
  //   FileSaver.saveAs(file);
  // }

}
