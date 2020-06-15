import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Product} from "./product";

export class ProductImage implements Deserializable {
  id: number;
  url: string;
  product_id: number;
  product: Product;

  deserialize(input: any): this {
    console.log(input);
    this.url = input.image;
    return Object.assign(this, input);
  }


}
