import {Role} from './role';

export class User {
  id: number;
  firstname: string;
  lastname: string;
  phone_number: string;
  image: string;
  biography: string;
  email: string;
  role_id: Role;

}
