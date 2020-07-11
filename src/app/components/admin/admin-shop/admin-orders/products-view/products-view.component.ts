import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {ProductOrderService} from "../../../../../services/product/product-order.service";
import {ProductOrder} from "../../../../../models/product/productOrder";
import {OrdersProduct} from "../../../../../models/product/ordersProduct";
import {Product} from "../../../../../models/product/product";
import {EditProductComponent} from "../../edit-product/edit-product.component";

@Component({
  selector: 'app-products-view',
  templateUrl: './products-view.component.html',
  styleUrls: ['./products-view.component.css']
})
export class ProductsViewComponent implements OnInit {
  order: OrdersProduct[];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private productOrderService: ProductOrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productOrderService.findById(this.data.orderId).subscribe((perf:any) => {
      this.order = perf.map(data => new OrdersProduct().deserialize(data));
    });
  }
  openDialog(product: Product) {
    const dialogRef = this.dialog.open(EditProductComponent, {
      data: {
        productId: product.id,
      },
      width: '60%'
    });
  }
}
