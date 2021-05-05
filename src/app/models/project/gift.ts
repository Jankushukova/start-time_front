import {Role} from '../user/role';
import {Deserializable} from '../deserializable.model';
import {ProjectCategory} from './projectCategory';
import {User} from '../user/user';
import {Project} from './project';

export class Gift implements Deserializable{
  id: number;
  description: string;
  sum: number;
  // tslint:disable-next-line:variable-name
  project_id: number;
  project: any;
  image: string;


  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
