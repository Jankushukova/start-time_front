import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {ProductCategory} from './productCategory';
import {ProductImage} from './productImage';
import {ProjectImage} from '../project/projectImage';

export class Product implements Deserializable {
  id: number;
  title: string;
  description: string;
  cost: string;
  category_id: ProductCategory;
  images: ProductImage[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.images = input.images.map(data => new ProductImage().deserialize((data)));
    return this;

  }


}
