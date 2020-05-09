import {Role} from './role';
import {Deserializable} from './deserializable.model';
import {ProjectCategory} from './projectCategory';
import {User} from './user';
import {Project} from './project';

export class News implements Deserializable{
  id: number;
  title: string;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
