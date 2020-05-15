import { Injectable } from '@angular/core';
import {Project} from '../../models/project/project';
import {Observable} from 'rxjs';
import {ProjectOrder} from '../../models/project/projectOrder';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {ProjectCategory} from '../../models/project/projectCategory';
import {map} from 'rxjs/operators';
import {User} from '../../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class ProjectOrderService {
  mainUrl = environment.apiUrl + '/api/v1/project/orders';
  customUrl = environment.apiUrl + '/api/v1';

  constructor(public http: HttpClient) { }




  public getBakersOfUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.customUrl}/user/bakers/${id}`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  public getBakersOfProject(id: number): Observable<ProjectOrder[]> {
    return this.http.get<ProjectOrder[]>(`${this.mainUrl}/project/bakers/${id}`).pipe(
      map(data => data.map(data => new ProjectOrder().deserialize(data)))
    );
  }
  public findById(id: number): Observable<ProjectOrder> {
    return this.http.get<ProjectOrder>(`${this.mainUrl}/${id}`);
  }

  public create(order: ProjectOrder): Observable<ProjectOrder> {
    return this.http.post<ProjectOrder>(this.mainUrl, order);
  }

  public update(id: number, order: ProjectOrder): Observable<ProjectOrder> {
    return this.http.put<ProjectOrder>(`${this.mainUrl}/${id}`, order);
  }

  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
