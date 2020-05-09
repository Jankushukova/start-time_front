import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subscription} from '../../models/user/subscription';
import {environment} from '../../../environments/environment';
import {Project} from '../../models/project/project';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  mainUrl = environment.apiUrl + "/api/v1/subscribe";
  constructor(public http: HttpClient) {
  }

  //+
  public create(sb: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.mainUrl, sb);
  }
  public getSubscribers(id: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>( this.mainUrl).pipe(
      map(data => data.map(data => new Subscription().deserialize(data)))
    );

  }

//+
  public update(id: number, sb: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.mainUrl}/${id}`, sb);
  }
//+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
