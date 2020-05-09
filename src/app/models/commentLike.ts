import {Role} from './role';
import {Deserializable} from './deserializable.model';
import {ProjectCategory} from './projectCategory';
import {User} from './user';
import {ProjectComment} from './projectComment';
import {NewsComment} from './newsComment';

export class CommentLike implements Deserializable{
  id: number;
  viewed: boolean;
  user_id: number;
  user: User;
  project_comment_id: number;
  project_comment: ProjectComment;
  news_comment_id: number;
  news_comment: NewsComment;

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.user){
      this.user = new User().deserialize(input.user);
    }
    if(input.project_comment){
      this.project_comment = new ProjectComment().deserialize(input.project_comment);
    }
    if(input.news_comment){
      this.news_comment = new NewsComment().deserialize(input.news_comment);
    }
    return this;
  }
}
