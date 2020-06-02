import {Deserializable} from '../deserializable.model';
import {User} from '../user/user';
import {Project} from './project';
import {Payment} from '../payment';
import {Gift} from "./gift";

export class ProjectOrder implements Deserializable{
  id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  email: string;
  sum: number;
  viewed: number;
  project_id: number;
  project: Project;
  user_id: User;
  gift_id: number;
  gift: Gift;
  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.gift) this.gift = new Gift().deserialize(input.gift);
    if(input.project) this.project = new Project().deserialize(input.project);
    return this;
  }



}
