import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';

export class ProjectImage implements Deserializable {
  id: number;
  image: File;
  project_id: Project;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
