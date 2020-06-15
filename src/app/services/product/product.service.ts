import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product/product';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Project} from '../../models/project/project';
import {map} from 'rxjs/operators';
import {ProjectImage} from '../../models/project/projectImage';
import {ProductImage} from '../../models/product/productImage';
import {ProjectComment} from "../../models/project/projectComment";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  mainUrl = environment.apiUrl + '/api/v1/product';
  customUrl = environment.apiUrl + '/api/v1';
  private products = new BehaviorSubject([]);
  products$ = this.products.asObservable();

  changeProducts(data: Product[]) {
    this.products.next(data);
  }
  constructor(public http: HttpClient) {
  }

  // +
  public addView(id: number): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/view/add`, {product_id: id});
  }
  // +
  public changeState(id): Observable<any> {
    return this.http.put<any>(`${this.mainUrl}/change/state`, {product_id: id});
  }

  // +
  public getMostPopular(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.mainUrl}/popular`).pipe(
      map(data => data.map(entryData => new Product().deserialize(entryData)))
    );
  }



  // +
  public getProducts(perPageCount: number, pageNumber: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.mainUrl}s`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public getAllProducts(perPageCount: number, pageNumber: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.mainUrl}/all`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public filterProducts(attributeName: string, text: string, perPageCount: number, pageCount: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.mainUrl}/filter`, {
      // @ts-ignore
      params: {
        searchText: text,
        attribute: attributeName,
        perPage: perPageCount,
        page: pageCount
      }
    });
  }

// +
  public create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.mainUrl, product);
  }
  // +
  public createProductImages(images: any): Observable<ProductImage> {
    return this.http.post<ProductImage>( `${this.mainUrl}/create/images`, images);
  }
  // +
  public getImagesOfProduct(id: number): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>( `${this.mainUrl }/images/${id}`).pipe(
      map(data => data.map(entryData => new ProductImage().deserialize(entryData)))
    );
  }
  // +
  public getActiveProductsOfUser(perPageCount: number, pageNumber: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.customUrl}/user/products/active`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }
  // +
  public getUnActiveProductsOfUser(perPageCount: number, pageNumber: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.customUrl}/user/products/unactive`, {
      // @ts-ignore
      params: {
        perPage: perPageCount,
        page: pageNumber
      }
    });
  }

  // +
  public findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.mainUrl}/show/${id}`);
  }

  // +
  public update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.mainUrl}/${id}`, product);
  }
  // +
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
