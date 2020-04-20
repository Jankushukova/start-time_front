import {Deserializable} from './deserializable.model';
import {Role} from './role';
import {User} from './user';
import {News} from './news';

export class NewsComment implements Deserializable{
  id: number;
  description: string;
  user_id: User;
  news_is: News;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
