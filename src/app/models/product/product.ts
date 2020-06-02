import {Deserializable} from '../deserializable.model';
import {Observable} from 'rxjs';
import {ProductImage} from './productImage';
import {ProjectImage} from '../project/projectImage';
import {ProductLike} from './productLike';
import {User} from "../user/user";
import {Project} from "../project/project";

export class Product implements Deserializable {
  id: number;
  title: string;
  description: string;
  cost: number;
  images: ProductImage[];
  likes: ProductLike[];
  user: User;
  project: Project;
  created_at: string;
  views: number;
  liked: boolean;
  active: boolean;

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.images)this.images = input.images.map(data => new ProductImage().deserialize((data)));
    if (input.likes)this.likes = input.likes.map(data => new ProductLike().deserialize((data)));
    if (input.user)this.user = new User().deserialize(input.user);
    if (input.project)this.project = new Project().deserialize(input.project);
    return this;

  }


}
