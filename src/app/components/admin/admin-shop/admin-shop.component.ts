import { Component, OnInit } from '@angular/core';
import {Project} from "../../../models/project/project";
import {Product} from "../../../models/product/product";
import {ProductService} from "../../../services/product/product.service";

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit {
  products: Product[] = [];
  page = 1;
  perPageCount = 12;
  totalProductsCount: number;
  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.changeProducts();
  }
  changeProducts() {
    this.products = null;
    this.productService.getAllProducts(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalProductsCount = perf.total;
      this.products = perf.data.map(data => new Product().deserialize(data));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeProducts();
  }

}
