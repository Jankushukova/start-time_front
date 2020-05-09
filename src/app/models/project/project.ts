import {User} from '../user/user';
import {ProjectCategory} from './projectCategory';
import {Deserializable} from '../deserializable.model';
import {ProjectImage} from './projectImage';
import {Role} from '../user/role';
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
    if(input.images) this.images = input.images.map(data => new ProjectImage().deserialize((data)));
    if (input.user) this.owner = new User().deserialize((input.user));
    if(input.updates) this.updates = input.updates.map(data => new Update().deserialize(data));
    if(input.questions) this.questions = input.questions.map(data => new ProjectQuestion().deserialize(data));
    if(input.comments) this.comments = input.comments.map(data => new ProjectComment().deserialize(data));
    if(input.likes) this.likes = input.likes.map(data => new ProjectLike().deserialize(data));

    return this;

  }
}

