import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from '../user/user';
import {UpdateImage} from "./updateImage";

export class Update implements Deserializable {
  id: number;
  title: string;
  description: string;
  project_id: number;
  project:Project;
  images:UpdateImage[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.images) this.images = input.images.map(data => new UpdateImage().deserialize(data));
    if(input.project) this.project = new Project().deserialize(input.project);
    return this;
  }


}
