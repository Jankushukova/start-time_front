import {Deserializable} from '../deserializable.model';
import {Role} from '../user/role';
import {User} from '../user/user';
import {ProductOrder} from './productOrder';
import {Product} from './product';

export class OrdersProduct implements Deserializable{
  id: number;
  // tslint:disable-next-line:variable-name
  product_id: number;
  // tslint:disable-next-line:variable-name
  order_id: number;
  count: number;
  product: any;
  order: any;
  sum: number;
  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.product) {
      this.product = new Product().deserialize(input.product);
    }
    return this;
  }

}
