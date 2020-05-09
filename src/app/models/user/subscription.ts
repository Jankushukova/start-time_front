import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from '../project/project';
import {User} from './user';

export class Subscription implements Deserializable {
  id: number;
  email: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
