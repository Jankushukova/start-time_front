import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Gift} from '../models/gift';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiftService {
  mainUrl = environment.apiUrl + "/api/v1/gifts";
  customUrl = environment.apiUrl + "/api/v1";

  constructor(public http: HttpClient) {
  }


  //+
  public getGiftsOfProject(id: number): Observable<Gift[]> {
    return this.http.get<Gift[]>( `${this.mainUrl }/project/gifts/${id}`).pipe(
      map(data => data.map(data => new Gift().deserialize(data)))
    );
  }

//+
  public create(gifts: Gift): Observable<Gift> {
    return this.http.post<Gift>(this.mainUrl, gifts);
  }
//+
  public findById(id: number): Observable<Gift> {
    return this.http.get<Gift>(`${this.mainUrl}/${id}`);
  }
//+
  public update(id: number, gifts: Gift): Observable<Gift> {
    return this.http.put<Gift>(`${this.mainUrl}/${id}`, gifts);
  }
//+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
