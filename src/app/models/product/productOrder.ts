import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Payment} from '../payment';
import {User} from '../user/user';
import {Product} from "./product";
import {OrdersProduct} from "./ordersProduct";

export class ProductOrder implements Deserializable {
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  user_id: User;
  payment_id: Payment;
  products: any;
  user: any;
  payment: any;

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.products) {
      this.products = input.products.map(data => new OrdersProduct().deserialize(data));
    }
    if (input.user) {
      this.user = new User().deserialize(input.user);
    }
    if (input.payment) {
      this.payment = new Payment().deserialize(input.payment);
    }
    return this;
  }



}
