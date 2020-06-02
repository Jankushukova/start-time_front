import { Component, OnInit } from '@angular/core';
import {Product} from '../../../models/product/product';
import {ProductService} from '../../../services/product/product.service';
import {ProductLike} from '../../../models/product/productLike';
import {UserService} from '../../../services/user/user.service';
import {LikeService} from '../../../services/like.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthProductDetailsComponent} from './product-details/auth-product-details.component';
import {SimpleAuthService} from '../../../services/auth.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-shop',
  templateUrl: './auth-shop.component.html',
  styleUrls: ['./auth-shop.component.css']
})
export class AuthShopComponent implements OnInit {
  authorized = false;
  products: Product[] = [];
  page = 1;
  perPageCount = 12;
  totalProductsCount: number;
  constructor(
    private productService: ProductService,
    private userService: UserService,
    private likeService: LikeService,
    private authService: SimpleAuthService,
    public dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.authorized = this.authService.loggedIn(false);
    this.changeProducts();
  }

  changeProducts() {
    this.products = null;
    this.productService.getProducts(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalProductsCount = perf.total;
      this.products = perf.data.map(data => new Product().deserialize(data));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeProducts();
  }


  like(product: Product) {
    if (this.authorized) {
      const like: ProductLike = new ProductLike();
      like.user_id = this.userService.getUser().id;
      like.product_id = product.id;

      this.likeService.createProductLike(like).subscribe(perf => {
        product.likes.push(perf);
        product.liked = true;
      });
    } else {
      this.openSnackBar('Only authorized users can like', 'Close', 'style-warn');
    }
  }

  unlike(product: Product) {
    if (this.authorized) {
      this.likeService.deleteByIdProductLike(product.id).subscribe((perf: any) => {
        product.likes = product.likes.filter(like => like.id !== perf.id);
        product.liked = false;
      });
    } else {
      this.openSnackBar('Only authorized users can like', 'Close', 'style-warn');
    }
  }

  openDialog(product: Product) {
    const dialogRef = this.dialog.open(AuthProductDetailsComponent, {
      data: {
        productId: product.id,
      },
      width: '60%'
    });
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
