import {Role} from './role';
import {Deserializable} from './deserializable.model';
import {ProjectCategory} from './projectCategory';
import {User} from './user';
import {Project} from './project';

export class Gift implements Deserializable{
  id: number;
  description: string;
  sum: number;
  project_id: Project;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
