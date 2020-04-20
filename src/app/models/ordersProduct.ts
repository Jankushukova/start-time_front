import {Deserializable} from './deserializable.model';
import {Role} from './role';
import {User} from './user';
import {ProductOrder} from './productOrder';
import {Product} from './product';

export class OrdersProduct implements Deserializable{
  id: number;
  product_id: Product;
  order_id: ProductOrder;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
