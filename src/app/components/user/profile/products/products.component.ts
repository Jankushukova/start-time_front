import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Project} from "../../../../models/project/project";
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectService} from "../../../../services/project/project.service";
import {UserService} from "../../../../services/user/user.service";
import {LikeService} from "../../../../services/like.service";
import {MatDialog} from "@angular/material/dialog";
import {TranslateService} from "@ngx-translate/core";
import {ProjectLike} from "../../../../models/project/projectLike";
import {EditUnactiveProjectComponent} from "../projects/edit-unactive-project/edit-unactive-project.component";
import {AddProductToFinishedProjectComponent} from "../projects/add-product-to-finished-project/add-product-to-finished-project.component";
import {Product} from "../../../../models/product/product";
import {ProductService} from "../../../../services/product/product.service";
import {ProductLike} from "../../../../models/product/productLike";
import {AuthProductDetailsComponent} from "../../shop/product-details/auth-product-details.component";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  selected = new FormControl(0);
  activeProducts: Product[];
  unactiveProducts: Product[];
  activeProductpage = 1;
  unactiveProductpage = 1;
  perPageCount = 5;
  totalActiveProductCount: number;
  totalUnActiveProductCount: number;
  userId = 0;
  translate;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService,
    private userService: UserService,
    private likeService: LikeService,
    private dialog: MatDialog,
    private translator: TranslateService

  ) { }
  ngOnInit(): void {
    this.translate = this.translator;
    this.userId = this.userService.getUser().id;
    if (parseInt(this.route.snapshot.queryParamMap.get('unactive'), 10) === 1) {
      this.changeUnActiveProducts();
      this.selected.setValue(1);
    } else {
      this.changeActiveProducts();
    }
  }
  changeActiveProducts() {
    this.activeProducts = null;
    this.productService.getActiveProductsOfUser(this.perPageCount, this.activeProductpage ).subscribe((perf: any) => {
      this.totalActiveProductCount = perf.total;
      this.activeProducts = perf.data.map(data => new Product().deserialize(data));
      console.log(this.activeProducts);
    });
  }
  changeUnActiveProducts() {
    this.unactiveProducts = null;
    this.productService.getUnActiveProductsOfUser(this.perPageCount, this.unactiveProductpage ).subscribe((perf: any) => {
      this.totalUnActiveProductCount = perf.total;
      this.unactiveProducts = perf.data.map(data => new Product().deserialize(data));
      console.log(this.unactiveProducts);
    });
  }
  changePageActiveProducts(event) {
    this.activeProductpage = event;
    this.changeActiveProducts();
  }

  changePageUnActiveProducts(event) {
    this.unactiveProductpage = event;
    this.changeUnActiveProducts();
  }

  like(product: Product) {
      const like: ProductLike = new ProductLike();
      like.user_id = this.userService.getUser().id;
      like.product_id = product.id;

      this.likeService.createProductLike(like).subscribe(perf => {
        product.likes.push(perf);
        product.liked = true;
      });
  }

  unlike(product: Product) {
      this.likeService.deleteByIdProductLike(product.id).subscribe((perf: any) => {
        product.likes = product.likes.filter(like => like.id !== perf.id);
        product.liked = false;
      });
  }


  changed(event) {
    if (event === 0) {
      this.changeActiveProducts();
    } else if (event === 1) {
      this.changeUnActiveProducts();
    }
  }
  openDialog(product: Product, unactive) {
    const dialogRef = this.dialog.open(AuthProductDetailsComponent, {
      data: {
        productId: product.id,
        UnActive: unactive,
      },
      width: '60%'
    });
  }

  deleteUnActiveProduct(product: Product, i) {
    this.unactiveProducts.splice(i, 1);
    this.productService.deleteById(product.id).subscribe(perf => {
      console.log('deleted');
    });
  }
}
