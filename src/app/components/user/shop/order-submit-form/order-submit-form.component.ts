import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {OrderProductsService} from '../../../../services/product/order-products.service';
import {Product} from '../../../../models/product/product';
import {OrdersProduct} from '../../../../models/product/ordersProduct';
import {AuthProductDetailsComponent} from '../product-details/auth-product-details.component';
import {MatDialog} from '@angular/material/dialog';
import {UserService} from '../../../../services/user/user.service';
import {SimpleAuthService} from '../../../../services/auth.service';
import {ProductOrder} from "../../../../models/product/productOrder";
import {ProjectOrder} from "../../../../models/project/projectOrder";
import {environment} from "../../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

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
  authorizedUser;
  constructor(
    private builder: FormBuilder,
    private orderProductsService: OrderProductsService,
    public dialog: MatDialog,
    private userService: UserService,
    private authService: SimpleAuthService,
    private translator: TranslateService

  ) { }

  ngOnInit(): void {
    this.authorizedUser = this.userService.getUser();
    this.orderProductForm = this.builder.group({
      type: ['', Validators.required],
      email: [(this.authorizedUser) ? this.authorizedUser.email : '', [ Validators.required, Validators.email]],
      first_name: [(this.authorizedUser) ? this.authorizedUser.firstname : '', Validators.required],
      last_name: [(this.authorizedUser) ? this.authorizedUser.lastname : '', Validators.required],
      phone_number: [(this.authorizedUser) ? this.authorizedUser.phone_number : '', Validators.required],
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
    const type = this.orderProductForm.controls.type.value;
    const order: ProductOrder = this.orderProductForm.getRawValue();
    this.orderProducts = this.orderProducts.map(data => {
      data.product_id = data.product.id;
      return data;
    });
    if (type === '2') {
      this.orderProductsService.create(order, this.orderProducts).subscribe(perf => {
        this.orderProductsService.createEpay(perf.id, this.totalSum).subscribe(perf2 => {
          window.location.href = perf2.url;

        });

      });
    } else if (type === '3') {
      this.orderCloudPayments(order);
    }
  }

  orderCloudPayments(order: ProductOrder) {
    let productName = '';
    for (const o of this.orderProducts) {
      // tslint:disable-next-line:max-line-length
      productName += ', ' + (this.translator.currentLang === 'rus') ? o.product.title_rus : (this.translator.currentLang === 'eng') ? o.product.title_eng :o.product.title_kz;
    }
    const amount = this.totalSum;
    const email = order.email;
    // @ts-ignore
    const widget = new cp.CloudPayments();
    this.orderProductsService.create(order, this.orderProducts).subscribe(perf => {
      order.id = perf.id;
      widget.charge({ // options
          publicId: environment.cloudPaymentsPublicId,  // id из личного кабинета
          description: productName, // назначение
          amount: amount, // сумма
          currency: 'KZT', // валюта
          email: email,
          invoiceId: order.id,
          skin: 'modern', // дизайн виджета
          data: {
            myProp: 'myProp value' // произвольный набор параметров
          }
        },
        (options) => { // success
          this.orderProductsService.cloudSuccess(order.id, amount).subscribe(perf2 => {
          });

        },
        (reason, options) => { // fail
        });
    });
  }


}
