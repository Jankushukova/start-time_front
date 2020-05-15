import {User} from '../user/user';
import {ProjectCategory} from './projectCategory';
import {Deserializable} from '../deserializable.model';
import {ProjectImage} from './projectImage';
import {Role} from '../user/role';
import {ProjectComment} from './projectComment';
import {ProjectLike} from './projectLike';
import {Update} from './update';
import {ProjectQuestion} from './projectQuestion';
import {Injector} from "@angular/core";

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
  owner_id:number;
  // tslint:disable-next-line:variable-name
  category_id: number;
  views:number;
  liked:boolean
  owner: User;
  images: any;
  likes: any;
  bakers: User[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.user) this.owner = new User().deserialize((input.user));

    return this;

  }
}

