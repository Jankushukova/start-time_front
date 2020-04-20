import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductOrder} from '../models/productOrder';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Project} from '../models/project';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {ProjectImage} from '../models/projectImage';
import {ProductImage} from '../models/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  mainUrl = environment.apiUrl + "/api/v1/product/order";

  constructor(public http: HttpClient) {
  }
//+
  public getProductOrderedUsers(id: number): Observable<User[]> {//here is id of product
    return this.http.get<User[]>( `${this.mainUrl }/${id}`).pipe(
      map(data => data.map(data => new User().deserialize(data)))
    );
  }

  //+
  public create(order: ProductOrder): Observable<ProductOrder> {
    return this.http.post<ProductOrder>(this.mainUrl, order);
  }

  public createProductImages(images: ProductImage): Observable<ProductImage> {
    return this.http.post<ProductImage>( `${this.mainUrl}/create/images`, images);
  }

//+
  public findById(id: number): Observable<ProductOrder> {
    return this.http.get<ProductOrder>(`${this.mainUrl}/${id}`);
  }

  //+
  public update(id: number, order: ProductOrder): Observable<ProductOrder> {
    return this.http.put<ProductOrder>(`${this.mainUrl}/${id}`, order);
  }

  //+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
