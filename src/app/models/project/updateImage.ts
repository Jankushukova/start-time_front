import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {Project} from './project';
import {User} from '../user/user';
import {Update} from './update';

export class UpdateImage implements Deserializable {
  id: number;
  image: string;
  update_id: number;
  update:Update;
  images: UpdateImage[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.update)this.update = new Update().deserialize(input.update);
    if(input.images)this.images = input.images.map(data => new UpdateImage().deserialize(data));
    return this;
  }


}
