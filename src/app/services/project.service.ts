import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user';
import {Observable} from 'rxjs';
import {Project} from '../models/project';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  createUrl = environment.apiUrl + '/api/v1/user/project/create';

  constructor(public http: HttpClient) { }

  public create(project: Project): Observable<Project> {
    return this.http.post<Project>(this.createUrl, project);
  }
}
