import {Deserializable} from '../deserializable.model';
import {Role} from '../user/role';
import {User} from '../user/user';
import {News} from './news';

export class NewsLike implements Deserializable{
  id: number;
  viewed: boolean;
  news_id: number;
  news: News;
  user: User;
  user_id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
