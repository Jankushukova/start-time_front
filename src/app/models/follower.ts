import {Deserializable} from './deserializable.model';
import {Role} from './role';
import {User} from './user';

export class Follower implements Deserializable{
  id: number;
  viewed: boolean;
  follower_id: number;
  following_id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
