import {Deserializable} from './deserializable.model';
import {User} from './user';
import {Project} from './project';
import {Payment} from './payment';

export class ProjectOrder implements Deserializable{
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  viewed: string;
  project_id: Project;
  payment_id: Payment;
  user_id: User;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }



}
