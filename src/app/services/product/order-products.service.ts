import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Product} from '../../models/product/product';
import {OrdersProduct} from '../../models/product/ordersProduct';
import {ProjectOrder} from "../../models/project/projectOrder";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {ProductOrder} from "../../models/product/productOrder";

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  private data = new BehaviorSubject([]);
  data$ = this.data.asObservable();
  mainUrl = environment.apiUrl + '/api/v1/product/orders';
  customUrl = environment.apiUrl + '/api/v1';

  constructor(public http: HttpClient) { }


  changeData(data: OrdersProduct[]) {
    this.data.next(data);
  }
  public createEpay(orderId: number, amount: number): any {
    return this.http.post(this.mainUrl + '/payment', {order_id: orderId, sum: amount}, {responseType: 'json'});
  }
  public create(order: ProductOrder, products: OrdersProduct[]): Observable<any> {
    return this.http.post(this.mainUrl + '/create', {order: order,products: products}, {responseType: 'json'});
  }
  public cloudSuccess(orderId: number, amount: number): Observable<any> {
    return this.http.post(this.mainUrl + '/cloud/success', {order_id: orderId, sum: amount}, {responseType: 'json'});
  }
}
