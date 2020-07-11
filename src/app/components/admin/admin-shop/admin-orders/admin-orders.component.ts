import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProductOrder} from "../../../../models/product/productOrder";
import {ProductOrderService} from "../../../../services/product/product-order.service";
import {Product} from "../../../../models/product/product";
import {EditProductComponent} from "../edit-product/edit-product.component";
import {MatDialog} from "@angular/material/dialog";
import {ProductsViewComponent} from "./products-view/products-view.component";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {Project} from "../../../../models/project/project";

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  orders: ProductOrder[] = [];
  page = 1;
  perPageCount = 1;
  totalOrdersCount: number;
  pattern: any = null;
  inputText = '';
  message = '';

  constructor(
    private productOrderService: ProductOrderService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
   this.changeOrders();
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.page = 1;
          this.filterOrders();
        })
      )
      .subscribe();
  }

  changeOrders() {
    this.orders = null;
    this.productOrderService.getAllOrders(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.mapOrders(perf);
    });
  }
  changePage(event) {
    this.page = event;
    if (this.pattern !== null) {
     if (typeof this.pattern === 'number') {
       this.filterByBank(this.pattern);
     } else if (typeof this.pattern === 'string') {
       this.filterOrders();
     }
    } else {
      this.changeOrders();
    }
  }
  openDialog(order: ProductOrder) {
    const dialogRef = this.dialog.open(ProductsViewComponent, {
      data: {
        orderId: order.id,
      },
      width: '60%'
    });
  }
  changeFilter(pattern) {
    this.pattern = pattern;
    this.inputText = '';
    this.message = '';
  }
  mapOrders(orders: any) {
    this.totalOrdersCount = orders.total;
    this.orders = orders.data.map(data => new ProductOrder().deserialize(data));
  }

  filterByBank(id: number) {
    this.pattern = id;
    this.productOrderService.getOrdersOfBank(id, this.perPageCount, this.page).subscribe((perf: any) => {
      this.mapOrders(perf);
    });
  }

  filterOrders() {
    const searchText = this.input.nativeElement.value;
    if (this.pattern !== null) {
      this.productOrderService.filterOrders(this.pattern, searchText, this.perPageCount, this.page).subscribe((perf: any) => {
        this.mapOrders(perf);
      });
    } else {
      this.message = 'please choose filter';
    }
  }
  removeFilters() {
    this.pattern = null;
    this.inputText = '';
    this.message = '';
    this.changeOrders();
  }

}
