import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from '../user/user';
import {Update} from './update';

export class UpdateImage implements Deserializable {
  id: number;
  image: string;
  update_id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }



}
