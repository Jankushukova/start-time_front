import {Deserializable} from './deserializable.model';
import {User} from './user/user';
import {Project} from './project/project';

export class PaymentType implements Deserializable{
  id: number;
  name: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }


}
