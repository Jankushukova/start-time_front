import {Component, Inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../services/product/product.service';
import {Product} from '../../../../models/product/product';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderProductsService} from '../../../../services/product/order-products.service';
import {OrdersProduct} from '../../../../models/product/ordersProduct';

@Component({
  selector: 'app-product-details',
  templateUrl: './auth-product-details.component.html',
  styleUrls: ['./auth-product-details.component.css']
})
export class AuthProductDetailsComponent implements OnInit {
  product: Product;
  count = 1;
  sum = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private productService: ProductService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private orderProductsService: OrderProductsService
  ) {
    productService.findById(data.productId).subscribe(perf => {
     this.product = perf;
     this.productService.addView(this.product.id);
     this.sum = +this.product.cost;
     console.log(typeof  this.product.cost);
   });
  }

  slideConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false
  };
  ngOnInit(): void {
  }

  intoTheBasket() {
    let override = false;
    let products: OrdersProduct[] = [];
    this.orderProductsService.data$.subscribe(perf => products = perf);
    products.map(data => {
      if (data.product.id === this.product.id) {
        data.count += this.count;
        data.sum += this.sum;
        override = true;
      }
    });
    if (!override) {
      const order: OrdersProduct = new OrdersProduct();
      order.count = this.count;
      order.product = this.product;
      order.sum = this.sum;
      products.push(order);
    }
    console.log(products);
    this.orderProductsService.changeData(products);
    this.openSnackBar( this.count + ' ' + this.product.title + ' added to basket', 'Close', 'style-success');

  }
  changeCount(remove) {
    if (remove) {
      (this.count > 1) ? this.count-- : this.count = 1;
    } else {
      this.count ++;
    }
    this.sum = this.product.cost * this.count;
  }

  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
