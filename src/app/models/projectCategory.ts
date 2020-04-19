import {Deserializable} from './deserializable.model';
import {Observable} from 'rxjs';

export class ProjectCategory implements Deserializable {
  id: number;
  name: string;

  deserialize(input: any): this {
    return Object.assign(this, input);
  }


}
