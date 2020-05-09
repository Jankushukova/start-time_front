import {Deserializable} from './deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from './user';

export class ProjectLike implements Deserializable {
  id: number;
  viewed: boolean;
  project_id: Project;
  user_id: User;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
