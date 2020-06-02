import {User} from '../user/user';
import {Deserializable} from '../deserializable.model';
import {ProjectCategory} from "./projectCategory";
import {Gift} from "./gift";

export class Project implements Deserializable{
  id: number;
  title_rus: string;
  title_eng: string;
  title_kz: string;
  main_language: string;
  description_rus: string;
  description_kz: string;
  description_eng: string;
  deadline: string;
  content_eng: string;
  content_kz: string;
  content_rus: string;
  video: string;
  goal: number;
  gathered: number;
  active: boolean;
  backers: number;
  // tslint:disable-next-line:variable-name
  owner_id: number;
  // tslint:disable-next-line:variable-name
  category_id: number;
  category: ProjectCategory;
  views: number;
  liked: boolean;
  owner: User;
  images: any;
  likes: any[];
  bakers: User[];
  gifts: Gift[];

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.user) this.owner = new User().deserialize((input.user));
    if(input.category) this.category = new ProjectCategory().deserialize(input.category);
    if(input.gifts) this.gifts = input.gifts.map( res => new Gift().deserialize(res));
    return this;

  }
}

