import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from '../user/user';

export class Update implements Deserializable {
  id: number;
  title: string;
  description: string;
  project_id: Project;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
