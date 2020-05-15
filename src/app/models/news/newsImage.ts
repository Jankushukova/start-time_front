import {Deserializable} from '../deserializable.model';
import {Role} from '../user/role';
import {User} from '../user/user';
import {News} from './news';

export class NewsImage implements Deserializable{
  id: number;
  image:string;
  news_id: number;
  news: News;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
