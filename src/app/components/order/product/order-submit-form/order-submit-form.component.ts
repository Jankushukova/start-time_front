import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderProductsService} from '../../../../services/product/order-products.service';
import {Product} from '../../../../models/product/product';
import {OrdersProduct} from '../../../../models/product/ordersProduct';
import {AuthProductDetailsComponent} from '../../../user/shop/product-details/auth-product-details.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../../services/user/user.service';
import {SimpleAuthService} from '../../../../services/auth.service';

@Component({
  selector: 'app-order-submit-form',
  templateUrl: './order-submit-form.component.html',
  styleUrls: ['./order-submit-form.component.css']
})
export class OrderSubmitFormComponent implements OnInit {
  orderProductForm: FormGroup;
  orderProducts: OrdersProduct[] = [];
  totalSum = 0;
  authorized;
  userForm: FormGroup;
  constructor(
    private builder: FormBuilder,
    private orderProductsService: OrderProductsService,
    public dialog: MatDialog,
    private userService: UserService,
    private authService: SimpleAuthService

  ) { }

  ngOnInit(): void {
    this.orderProductForm = this.builder.group({
      comment: ['', Validators.required],
    });

    this.userForm = this.builder.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      phone_number: ['', Validators.required],
      email: ['', Validators.required],
    });
    this.orderProductsService.data$.subscribe(perf => {
      this.totalSum = 0;
      this.orderProducts = perf;
      perf.map(data => this.totalSum += parseInt(data.sum, 10));
    });
    this.authorized = this.authService.loggedIn(false);

  }

  deleteProduct(i) {
    this.orderProducts.splice(i, 1);
    this.orderProductsService.changeData(this.orderProducts);
  }

  changeCount(minus, product: OrdersProduct, i) {
    if (minus) {
      (product.count > 1 ) ? product.count-- : this.deleteProduct(i);
    } else {
      product.count++;
    }
    product.sum = product.product.cost * product.count;
    this.orderProductsService.changeData(this.orderProducts);
  }

  openDialog(product: Product) {
    const dialogRef = this.dialog.open(AuthProductDetailsComponent, {
      data: {
        productId: product.id,
      },
      width: '60%'
    });
  }

  onSubmit() {
    // 1 Payment
    // 2 Order
    // 3 OrderProducts
    this.payment();
    console.log('submission');
  }

  payment() {

  }

}
