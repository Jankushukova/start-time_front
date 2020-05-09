import {Role} from '../user/role';
import {Deserializable} from '../deserializable.model';
import {ProjectCategory} from '../project/projectCategory';
import {User} from '../user/user';
import {Project} from '../project/project';

export class News implements Deserializable{
  id: number;
  title: string;
  description: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
