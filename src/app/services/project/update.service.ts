import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Update} from '../../models/project/update';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Project} from '../../models/project/project';
import {map} from 'rxjs/operators';
import {UpdateImage} from '../../models/project/updateImage';
import {ProjectImage} from "../../models/project/projectImage";
import {ProjectQuestion} from "../../models/project/projectQuestion";

@Injectable({
  providedIn: 'root'
})
export class UpdateService {

  mainUrl = environment.apiUrl + '/api/v1/update';
  customUrl = environment.apiUrl + '/api/v1';
  private updates = new BehaviorSubject([]);
  updates$ = this.updates.asObservable();
  private deleteUpdate = new BehaviorSubject(false);
  deleteUpdate$ = this.deleteUpdate.asObservable();

  changeUpdates(data: Update[]) {
    this.updates.next(data);
  }
  removeUpdate(data: boolean) {
    this.deleteUpdate.next(data);
  }
  constructor(public http: HttpClient) {
  }

  //+
  public create(update: Update): Observable<Update> {
    return this.http.post<Update>(this.mainUrl, update);
  }
//+
  public getUpdateOfProject(id: number): Observable<Update[]> {
    return this.http.get<Update[]>( `${this.customUrl }/project/updates/${id}`).pipe(
      map(data => data.map(data => new Update().deserialize(data)))
    );
  }
//+
  public getUpdateImages(id: number): Observable<UpdateImage[]> {
    return this.http.get<UpdateImage[]>( `${this.mainUrl }/updates/images/${id}`).pipe(
      map(data => data.map(data => new UpdateImage().deserialize(data)))
    );
  }

  // +
  public createUpdateImages(images: any): Observable<UpdateImage> {
    return this.http.post<UpdateImage>( `${this.mainUrl}/create/images`, images);
  }

  //+
  public update(id: number, update: Update): Observable<Update> {
    return this.http.put<Update>(`${this.mainUrl}/${id}`, update);
  }
  //+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }

  //+
  public findById(id: number): Observable<Update> {
    return this.http.get<Update>(`${this.mainUrl}/${id}`).pipe(
      map(data => {
        return new Update().deserialize(data)}));
  }
}
