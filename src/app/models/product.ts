import {Deserializable} from './deserializable.model';
import {Observable} from 'rxjs';
import {ProductCategory} from './productCategory';

export class Product implements Deserializable {
  id: number;
  title: string;
  description: string;
  cost: string;
  category_id: ProductCategory;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
