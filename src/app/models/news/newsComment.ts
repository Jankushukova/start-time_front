import {Deserializable} from '../deserializable.model';
import {Role} from '../user/role';
import {User} from '../user/user';
import {News} from './news';
import {CommentLike} from "../commentLike";

export class NewsComment implements Deserializable{
  id: number;
  description: string;
  user: User;
  user_id: number;
  news: News;
  news_id: number;
  liked:boolean;
  likes:number[];
  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.likes) this.likes = input.likes.map(function(data){ new CommentLike().deserialize(data)})
    if(input.user) this.user = new User().deserialize(input.user);
    return this;
  }

}
