import {User} from "../user/user";
import {Product} from "./product";
import {Deserializable} from "../deserializable.model";

export class ProductLike implements Deserializable{
  id: number;
  viewed: boolean;
  user_id: number;
  user: User;
  product_id: number;
  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.user){
      this.user = new User().deserialize(input.user);
    }


    return this;
  }
}
