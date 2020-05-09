import {Deserializable} from './deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from './user';
import {Update} from './update';

export class UpdateImage implements Deserializable {
  id: number;
  image: string;
  update_id: Update;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
