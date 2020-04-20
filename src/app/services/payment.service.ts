import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Payment} from '../models/payment';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  mainUrl = environment.apiUrl + "/api/v1/payment";
  customUrl = environment.apiUrl + "/api/v1";

  constructor(public http: HttpClient) {
  }
//+
  public getPaymentsOfProject(id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>( `${this.customUrl }/project/payments/${id}`).pipe(
      map(data => data.map(data => new Payment().deserialize(data)))
    );
  }

  //+
  public getPaymentsOfProduct(id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>( `${this.customUrl }/product/payments/${id}`).pipe(
      map(data => data.map(data => new Payment().deserialize(data)))
    );
  }

  //+
  public getPaymentsOfProductOfType(id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>( `${this.customUrl }/product/type/payment${id}`).pipe(
      map(data => data.map(data => new Payment().deserialize(data)))
    );
  }
  //+
  public getPaymentsOfProjectOfType(id: number): Observable<Payment[]> {
    return this.http.get<Payment[]>( `${this.customUrl }/project/type/payment${id}`).pipe(
      map(data => data.map(data => new Payment().deserialize(data)))
    );
  }

  //+
  public getMyPayments(): Observable<Payment[]> {
    return this.http.get<Payment[]>( `${this.customUrl }/payments`).pipe(
      map(data => data.map(data => new Payment().deserialize(data)))
    );
  }


//+
  public create(payment: Payment): Observable<Payment> {
    return this.http.post<Payment>(this.mainUrl, payment);
  }
//+
  public findById(id: number): Observable<Payment> {
    return this.http.get<Payment>(`${this.mainUrl}/${id}`);
  }
//+
  public update(id: number, payment: Payment): Observable<Payment> {
    return this.http.put<Payment>(`${this.mainUrl}/${id}`, payment);
  }
//+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
