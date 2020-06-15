import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ProductOrder} from '../../models/product/productOrder';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Project} from '../../models/project/project';
import {map} from 'rxjs/operators';
import {User} from '../../models/user/user';
import {ProjectImage} from '../../models/project/projectImage';
import {ProductImage} from '../../models/product/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {
  mainUrl = environment.apiUrl + "/api/v1/product/order";

  constructor(public http: HttpClient) {
  }
  // +
  public getProductOrderedUsers(id: number): Observable<User[]> {// here is id of product
    return this.http.get<User[]>( `${this.mainUrl }/${id}`).pipe(
      map(data => data.map(entryData => new User().deserialize(entryData)))
    );
  }

  // +
  public getOrdersOfBank(bankId: number, perPageCount: number, pageCount: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.mainUrl}/bakers/bank`, {
      // @ts-ignore
      params: {
        id: bankId,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }

  // +
  public getAllOrders(perPageCount: number, pageNumber: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>( `${this.mainUrl }/all`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }

  //+
  public create(order: ProductOrder): Observable<ProductOrder> {
    return this.http.post<ProductOrder>(this.mainUrl, order);
  }

  public createProductImages(images: ProductImage): Observable<ProductImage> {
    return this.http.post<ProductImage>( `${this.mainUrl}/create/images`, images);
  }

  // +
  public findById(id: number): Observable<ProductOrder> {
    return this.http.get<ProductOrder>(`${this.mainUrl}/${id}`);
  }

  // +
  public update(id: number, order: ProductOrder): Observable<ProductOrder> {
    return this.http.put<ProductOrder>(`${this.mainUrl}/${id}`, order);
  }

  // +
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
  // +
  public filterOrders(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(`${this.mainUrl}/filter`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }
}
