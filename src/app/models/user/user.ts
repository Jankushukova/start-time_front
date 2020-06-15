import {Role} from './role';
import {Deserializable} from '../deserializable.model';
import {ProjectCategory} from '../project/projectCategory';
import {Project} from "../project/project";
import {Follower} from "./follower";
import {ProjectImage} from "../project/projectImage";

export class User implements Deserializable {
  id: number;
  fullname: string;
  firstname: string;
  lastname: string;
  // tslint:disable-next-line:variable-name
  phone_number: string;
  image: string;
  biography: string;
  email: string;
  // tslint:disable-next-line:variable-name
  role: Role;
  role_id: number;
  partner: boolean;
  projects: any;
  followers: User[];
  followedCount: any;
  followersCount: any;
  bakersCount: any;
  bakedCount: any;
  projectsCount: any;
  recommendationCount: any;
  deserialize(input: any): this {
    Object.assign(this, input);
    this.role = new Role().deserialize(input.role_id);
    return this;
  }

  getFullName() {
    return this.fullname;
  }


}
