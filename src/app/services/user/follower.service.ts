import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Project} from '../../models/project/project';
import {Observable} from 'rxjs';
import {Follower} from '../../models/user/follower';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FollowerService {
  mainUrl = environment.apiUrl + '/api/v1/followers';
  customUrl = environment.apiUrl + '/api/v1/';

  constructor(public http: HttpClient) { }



//+
  public getFollowersOfUser(id: number): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.customUrl }/followers/${id}`).pipe(
      map(data => data.map(data => new Follower().deserialize(data)))
    );
  }

//+
  public getFollowedOfUser(id: number): Observable<Follower[]> {
    return this.http.get<Follower[]>(`${this.customUrl}/followings/${id}`).pipe(
      map(data => data.map(data => new Follower().deserialize(data)))
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
