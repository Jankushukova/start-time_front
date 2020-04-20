import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Product} from '../models/product';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Project} from '../models/project';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../models/productCategory';
import {ProjectImage} from '../models/projectImage';
import {ProductImage} from '../models/productImage';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  mainUrl = environment.apiUrl + "/api/v1/product";

  constructor(public http: HttpClient) {
  }

  //+
  public getProductCategories(): Observable<ProductCategory[]> {
    return this.http.get<ProductCategory[]>(`${this.mainUrl}/category`).pipe(
      map(data => data.map(data => new ProductCategory().deserialize(data)))
    );
  }


  //+
  public getProductsOfCategory(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.mainUrl}/category/${id}`).pipe(
      map(data => data.map(data => new Project().deserialize(data)))
    );
  }

//+
  public create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.mainUrl, product);
  }
  //+
  public createProductImages(images: ProductImage): Observable<ProductImage> {
    return this.http.post<ProductImage>( `${this.mainUrl}/create/images`, images);
  }
  //+
  public getImagesOfProduct(id: number): Observable<ProductImage[]> {
    return this.http.get<ProductImage[]>( `${this.mainUrl }/images/${id}`).pipe(
      map(data => data.map(data => new ProductImage().deserialize(data)))
    );
  }

  //+
  public findById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.mainUrl}/show/${id}`);
  }

  //+
  public update(id: number, product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.mainUrl}/${id}`, product);
  }
  //+
  public deleteById(id: number) {
    return this.http.delete(`${this.mainUrl}/${id}`);
  }
}
