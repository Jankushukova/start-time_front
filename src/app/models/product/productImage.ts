import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';

export class ProductImage implements Deserializable {
  id: number;
  image: string;
  product_id: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
