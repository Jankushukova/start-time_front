import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProjectCategory} from '../../models/project/projectCategory';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Update} from "../../models/project/update";
import {Project} from "../../models/project/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  mainUrl = environment.apiUrl + '/api/v1/project/categories';
  customUrl = environment.apiUrl + '/api/v1';
  private categories = new BehaviorSubject([]);
  categories$ = this.categories.asObservable();
  changeCategories(data: ProjectCategory[]) {
    this.categories.next(data);
  }
  constructor(public http: HttpClient) { }
// +
  public get(): Observable<ProjectCategory[]> {
    return this.http.get<ProjectCategory[]>(this.mainUrl).pipe(
      map(data => data.map(entryData => new ProjectCategory().deserialize(entryData)))
    );
  }

  public getAllCategories(perPageCount: number, pageNumber: number): Observable<ProjectCategory[]> {
    return this.http.get<ProjectCategory[]>(`${this.customUrl}/project/category/all`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }


// +
  public create(category: ProjectCategory): Observable<ProjectCategory> {
    return this.http.post<ProjectCategory>(this.customUrl + '/project/category/create', category);
  }
// +
  public update(id: number, category: ProjectCategory): Observable<ProjectCategory> {
    return this.http.put<ProjectCategory>(`${this.customUrl}/project/category/update/${id}`, category);
  }
// +
  public deleteById(id: number) {
    return this.http.delete(`${this.customUrl}/project/category/delete/${id}`);
  }
  // +
  public findById(id: number): Observable<ProjectCategory> {
    return this.http.get<ProjectCategory>(`${this.customUrl}/project/category/${id}`).pipe(
      map(data => {
        return new ProjectCategory().deserialize(data); }));
  }

}
