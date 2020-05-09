import {User} from './user';
import {ProjectCategory} from './projectCategory';
import {Deserializable} from './deserializable.model';
import {ProjectImage} from './projectImage';
import {Role} from './role';
import {ProjectComment} from './projectComment';
import {ProjectLike} from './projectLike';
import {Update} from './update';
import {ProjectQuestion} from './projectQuestion';

export class Project implements Deserializable{
  id: number;
  title: string;
  description: string;
  deadline: string;
  content: string;
  video: string;
  goal: number;
  gathered: number;
  active: boolean;
  backers: number;
  // tslint:disable-next-line:variable-name
  owner: User;
  owner_id:number;
  // tslint:disable-next-line:variable-name
  category: ProjectCategory;
  category_id: number;
  images: ProjectImage[];
  comments: ProjectComment[];
  likes: ProjectLike[];
  updates: Update[];
  questions: ProjectQuestion[];

  deserialize(input: any): this {
    Object.assign(this, input);
    this.images = input.images.map(data => new ProjectImage().deserialize((data)));
    this.owner = new User().deserialize((input.user));

    return this;

  }
}

