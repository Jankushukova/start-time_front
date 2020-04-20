import {Deserializable} from './deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from './user';

export class ProjectComment implements Deserializable {
  id: number;
  text: string;
  viewed: boolean;
  user_id: User;
  project_id: Project;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
