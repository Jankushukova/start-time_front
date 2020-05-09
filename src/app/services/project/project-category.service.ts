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

  constructor(public http: HttpClient) { }
//+
  public get(): Observable<ProjectCategory[]> {
    return this.http.get<ProjectCategory[]>(this.mainUrl).pipe(
      map(data => data.map(data => new ProjectCategory().deserialize(data)))
    );
  }


//+
  public create(category: ProjectCategory): Observable<ProjectCategory> {
    return this.http.post<ProjectCategory>(this.mainUrl, category);
  }
//+
  public update(id: number, category: ProjectCategory): Observable<ProjectCategory> {
    return this.http.put<ProjectCategory>(`${this.mainUrl}/${id}`, category);
  }
//+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }

}
