import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from '../user/user';
import {ProjectLike} from './projectLike';
import {ProjectImage} from './projectImage';
import {CommentLike} from '../commentLike';

export class ProjectComment implements Deserializable {
  id: number;
  text: string;
  viewed: boolean;
  user: User;
  user_id: number;
  project: Project;
  project_id: number;
  likes: number[];
  liked: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.user)
    this.user = new User().deserialize(input.user);
    if(input.likes)
    this.likes = input.likes;
    return this;
  }


}
