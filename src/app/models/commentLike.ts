import {Role} from './user/role';
import {Deserializable} from './deserializable.model';
import {ProjectCategory} from './project/projectCategory';
import {User} from './user/user';
import {ProjectComment} from './project/projectComment';
import {NewsComment} from './news/newsComment';

export class CommentLike implements Deserializable{
  id: number;
  viewed: boolean;
  user_id: number;
  user: User;
  project_comment_id: number;
  news_comment_id: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.user){
      this.user = new User().deserialize(input.user);
    }

    return this;
  }
}
