import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {Product} from '../../models/product/product';
import {OrdersProduct} from '../../models/product/ordersProduct';

@Injectable({
  providedIn: 'root'
})
export class OrderProductsService {
  private data = new BehaviorSubject([]);
  data$ = this.data.asObservable();

  changeData(data: OrdersProduct[]) {
    this.data.next(data);
  }
}
