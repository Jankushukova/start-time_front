import {Role} from '../user/role';
import {Deserializable} from '../deserializable.model';
import {ProjectCategory} from '../project/projectCategory';
import {User} from '../user/user';
import {Project} from '../project/project';
import {NewsLike} from './newsLike';
import {NewsComment} from './newsComment';
import {NewsImage} from './newsImage';

export class News implements Deserializable {
  id: number;
  title: string;
  description: string;
  views: number;
  likes: NewsLike[];
  comments: NewsComment[];
  images: NewsImage[];
  liked: boolean;
  content: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.likes) {
      this.likes = input.likes.map((data) => new NewsLike().deserialize(data));
    }
    if (input.comments) {
      this.comments = input.comments.map((data) => new NewsComment().deserialize(data));
    }
    if (input.images) {
      this.images = input.images.map((data) => new NewsImage().deserialize(data));
    }
    return this;
  }
}
