import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../../../../../services/product/product.service";
import {Product} from "../../../../../models/product/product";

@Component({
  selector: 'app-product-details',
  templateUrl: './auth-product-details.component.html',
  styleUrls: ['./auth-product-details.component.css']
})
export class AuthProductDetailsComponent implements OnInit {
  product:Product;
  constructor(
    private route: ActivatedRoute,
    private productService:ProductService
  ) { }

  slideConfig = {
    "slidesToShow": 1,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };
  ngOnInit(): void {
    let id:number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.addView(id).subscribe(perf=>{
      console.log("view +1");
    })
    this.productService.findById(id).subscribe(perf=>{
      this.product = perf;
      console.log(perf);
    })
  }

}
