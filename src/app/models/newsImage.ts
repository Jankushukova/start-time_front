import {Deserializable} from './deserializable.model';
import {Role} from './role';
import {User} from './user';
import {News} from './news';

export class NewsImage implements Deserializable{
  id: number;
  image:string;
  news_id: News;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}
