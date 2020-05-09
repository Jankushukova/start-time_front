import {Deserializable} from '../deserializable.model';
import {ProjectCategory} from '../project/projectCategory';
import {User} from './user';

export class Role implements Deserializable {
  id: number;
  name: string;

  deserialize(input: any): this {
    this.id = input;
    if (this.id === 1) this.name = 'Admin';
    if (this.id === 2) this.name = 'Director';
    if (this.id === 3) this.name = 'Manager';
    if (this.id === 4) this.name = 'Authorized';
    return this;
  }

}
