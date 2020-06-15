import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Subscription} from '../../models/user/subscription';
import {environment} from '../../../environments/environment';
import {Project} from '../../models/project/project';
import {map} from 'rxjs/operators';
import {User} from "../../models/user/user";

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {
  mainUrl = environment.apiUrl + "/api/v1/subscribe";
  constructor(public http: HttpClient) {
  }

  //+
  public create(sb: Subscription): Observable<Subscription> {
    return this.http.post<Subscription>(this.mainUrl , sb);
  }
  public getSubscribers(perPageCount: number, pageCount: number): Observable<Subscription[]> {
    return this.http.get<Subscription[]>( this.mainUrl + '/all', {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageCount
      }
    });

  }
  // +
  public filterSubscribers(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<any> {
    return this.http.get<Subscription[]>(`${this.mainUrl}/filter`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }

//+
  public update(id: number, sb: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.mainUrl}/${id}`, sb);
  }

  //+
  public changeActiveStatus(sb: Subscription): Observable<Subscription> {
    return this.http.put<Subscription>(`${this.mainUrl}/status/change`, sb);
  }
//+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
