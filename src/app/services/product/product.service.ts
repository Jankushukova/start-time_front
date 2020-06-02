import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../../models/product/product';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {Project} from '../../models/project/project';
import {map} from 'rxjs/operators';
import {ProjectImage} from '../../models/project/projectImage';
import {ProductImage} from '../../models/product/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  mainUrl = environment.apiUrl + '/api/v1/product';

  constructor(public http: HttpClient) {
  }

  // +
  public addView(id: number): Observable<any> {
    return this.http.post<any>(`${this.mainUrl}/view/add`, {product_id: id});
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
  public create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.mainUrl, product);
  }
  // +
  public createProductImages(images: ProductImage): Observable<ProductImage> {
    return this.http.post<ProductImage>( `${this.mainUrl}/create/images`, images);
  }
  // +
  public getImagesOfProduct(id: number): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>( `${this.mainUrl }/images/${id}`).pipe(
      map(data => data.map(entryData => new ProductImage().deserialize(entryData)))
    );
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
