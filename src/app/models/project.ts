import {User} from './user';
import {ProjectCategory} from './projectCategory';
import {Deserializable} from './deserializable.model';

export class Project implements Deserializable{
  id: number;
  title: string;
  description: string;
  deadline: string;
  content: string;
  video: string;
  reward: string;
  gathered: string;
  active: boolean;
  // tslint:disable-next-line:variable-name
  owner_id: User;
  // tslint:disable-next-line:variable-name
  category_id: ProjectCategory;

  deserialize(input: any): this {
    Object.assign(this, input);
    this.category_id = new ProjectCategory().deserialize((input.category_id));
    this.owner_id = new User().deserialize((input.user_id));
    return this;
  }
}
