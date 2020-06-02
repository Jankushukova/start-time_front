import {Deserializable} from './deserializable.model';
import {User} from './user/user';
import {Project} from './project/project';
import {PaymentType} from './paymentType';

export class Payment implements Deserializable{
  id: number;
  sum: string;
  viewed: boolean;
  check_image: string;
  project_id: number;
  project: Project;
  type_id: number;
  bank: PaymentType;
  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.bank)this.bank = new PaymentType().deserialize(input.bank);
    return this;
  }


}
