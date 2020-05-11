import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from '../user/user';

export class ProjectLike implements Deserializable {
  id: number;
  viewed: boolean;
  project_id: number;
  project:Project
  user_id: number;
  user:User;

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.user)this.user = new User().deserialize(input.user);
    if(input.project)this.project = new Project().deserialize(input.project)
    return this;
  }


}
