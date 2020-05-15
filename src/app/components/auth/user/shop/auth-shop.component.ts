import { Component, OnInit } from '@angular/core';
import {Product} from "../../../../models/product/product";
import {ProductService} from "../../../../services/product/product.service";
import {Project} from "../../../../models/project/project";
import {ProjectLike} from "../../../../models/project/projectLike";
import {ProductLike} from "../../../../models/product/productLike";
import {UserService} from "../../../../services/user/user.service";
import {LikeService} from "../../../../services/like.service";

@Component({
  selector: 'app-shop',
  templateUrl: './auth-shop.component.html',
  styleUrls: ['./auth-shop.component.css']
})
export class AuthShopComponent implements OnInit {
  products:Product[]
  constructor(
    private productService:ProductService,
    private userService:UserService,
    private likeService: LikeService
  ) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(perf=>{
      this.products = perf;
    })
  }


  like(product:Product){
    let like:ProductLike = new ProductLike();
    like.user_id = this.userService.getUser().id;
    like.product_id = product.id;

    this.likeService.createProductLike(like).subscribe(perf=>{
      product.likes.push(perf);
      product.liked = true;
    })
  }

  unlike(product:Product){
    this.likeService.deleteByIdProductLike(product.id).subscribe(perf=>{
      // @ts-ignore
      product.likes = product.likes.filter(like => like.id!=perf.id);
      product.liked = false;


    })
  }

}
