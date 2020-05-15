import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../models/project/project';
import {Observable} from 'rxjs';
import {Follower} from '../../models/user/follower';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  mainUrl = environment.apiUrl + '/api/v1/followers';
  customUrl = environment.apiUrl + '/api/v1/';

  constructor(public http: HttpClient) { }



//+
  public getFollowersOfUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.customUrl }followers/${id}`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

//+
  public getFollowedOfUser(id: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.customUrl}followings/${id}`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  //+
  public create(follower: Follower): Observable<Follower> {
    return this.http.post<Follower>(this.mainUrl, follower);
  }


  //+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }

}
