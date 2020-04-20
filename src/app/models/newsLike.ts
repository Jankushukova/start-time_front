import {Deserializable} from './deserializable.model';
import {Role} from './role';
import {User} from './user';
import {News} from './news';

export class NewsLike implements Deserializable{
  id: number;
  viewed: boolean;
  news_id: News;
  user_id: User;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
