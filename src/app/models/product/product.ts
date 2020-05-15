import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {ProductImage} from './productImage';
import {ProjectImage} from '../project/projectImage';
import {ProductLike} from "./productLike";

export class Product implements Deserializable {
  id: number;
  title: string;
  description: string;
  cost: string;
  images: ProductImage[];
  likes: ProductLike[];
  views: number;
  liked:boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.images)this.images = input.images.map(data => new ProductImage().deserialize((data)));
    if(input.likes)this.likes = input.likes.map(data => new ProductLike().deserialize((data)));
    return this;

  }


}
