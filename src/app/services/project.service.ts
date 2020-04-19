import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Project} from '../models/project';
import {AuthService} from './auth.service';
import {ProjectOrder} from '../models/projectOrder';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  mainUrl = environment.apiUrl + '/api/v1/project/';
  customUrl = environment.apiUrl + '/api/v1/';

  constructor(public http: HttpClient,
              public authService: AuthService
              ) { }



  public getBakedProjectsOfUser(id: number): Observable<Project[]> {
    return this.http.get<Project[]>( `${this.mainUrl }user/baked/${id}`).pipe(
      map(data => data.map(data => new Project().deserialize(data)))
    );
  }

  public getProjectsOfUser(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.customUrl}user/projects/${id}`).pipe(
      map(data => data.map(data => new Project().deserialize(data)))
    );
  }







  public create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.mainUrl, project);
  }

  public findById(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.mainUrl}/${id}`);
  }

  public update(id: number, project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.mainUrl}/${id}`, project);
  }

  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
