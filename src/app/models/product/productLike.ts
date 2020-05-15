import {User} from "../user/user";
import {Product} from "./product";
import {Deserializable} from "../deserializable.model";

export class ProductLike implements Deserializable{
  id: number;
  viewed: boolean;
  user_id: number;
  user: User;
  product: Product;
  product_id: number;
  deserialize(input: any): this {
    Object.assign(this, input);
    if(input.user){
      this.user = new User().deserialize(input.user);
    }
    if(input.product){
      this.product = new Product().deserialize(input.product);
    }

    return this;
  }
}
