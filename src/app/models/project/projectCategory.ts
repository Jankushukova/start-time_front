import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from "./project";

export class ProjectCategory implements Deserializable {
  id: number;
  name_rus: string;
  name_kz: string;
  name_eng: string;
  projects: any[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.projects)this.projects = input.projects.map(data => new Project().deserialize(data));
    return this;
  }


}
