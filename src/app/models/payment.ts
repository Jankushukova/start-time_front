import {Deserializable} from './deserializable.model';
import {User} from './user';
import {Project} from './project';
import {PaymentType} from './paymentType';

export class Payment implements Deserializable{
  id: number;
  sum: string;
  viewed: boolean;
  check_image: string;
  project_id: Project;
  type_id: PaymentType;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }


}
