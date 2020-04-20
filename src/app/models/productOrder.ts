import {Deserializable} from './deserializable.model';
import {Observable} from 'rxjs';
import {Payment} from './payment';
import {User} from './user';

export class ProductOrder implements Deserializable {
  id: number;
  address: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  user_id: User;
  payment_id: Payment;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
