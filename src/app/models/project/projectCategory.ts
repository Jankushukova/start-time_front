import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from "./project";

export class ProjectCategory implements Deserializable {
  id: number;
  name: string;
  projects: Project[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.projects)this.projects = input.projects.map(data => new Project().deserialize(data));
    return this;
  }


}
