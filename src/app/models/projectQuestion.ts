import {Role} from './role';
import {Deserializable} from './deserializable.model';
import {ProjectCategory} from './projectCategory';
import {User} from './user';
import {Project} from './project';

export class ProjectQuestion implements Deserializable {
  id: number;
  question: string;
  user: User;
  user_id:number;
  project: Project;
  project_id: number;
  deserialize(input: any): this {
    Object.assign(this, input);
    this.user = new User().deserialize(input.user);
    return this;
  }


}
