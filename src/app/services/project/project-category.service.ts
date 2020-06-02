import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProjectCategory} from '../../models/project/projectCategory';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectCategoryService {
  mainUrl = environment.apiUrl + '/api/v1/project/categories';
  customUrl = environment.apiUrl + '/api/v1';

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
    return this.http.post<ProjectCategory>(this.mainUrl, category);
  }
// +
  public update(id: number, category: ProjectCategory): Observable<ProjectCategory> {
    return this.http.put<ProjectCategory>(`${this.mainUrl}/${id}`, category);
  }
// +
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }

}
