import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../models/project/project";
import {Product} from "../../../models/product/product";
import {ProductService} from "../../../services/product/product.service";
import {ProjectEditComponent} from "../admin-projects/project-edit/project-edit.component";
import {MatDialog} from "@angular/material/dialog";
import {EditProductComponent} from "./edit-product/edit-product.component";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {ProductOrder} from "../../../models/product/productOrder";

@Component({
  selector: 'app-admin-shop',
  templateUrl: './admin-shop.component.html',
  styleUrls: ['./admin-shop.component.css']
})
export class AdminShopComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  products: Product[] = [];
  page = 1;
  perPageCount = 1;
  totalProductsCount: number;
  pattern: any = null;
  inputText = '';
  message = '';
  bank: number;
  constructor(
    private productService: ProductService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.productService.products$.subscribe(perf => this.products = perf);
    this.changeProducts();
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          this.page = 1;
          this.filterProducts(null);
        })
      )
      .subscribe();
  }
  changeProducts() {
    this.products = null;
    this.productService.getAllProducts(this.perPageCount, this.page ).subscribe((perf: any) => {
     this.mapProducts(perf);
    });
  }
  changePage(event) {
    this.page = event;
    if ( this.pattern !== null) {
      (this.pattern === 'active') ? this.filterProducts(this.bank) : this.filterProducts(null);
    } else {
      this.changeProducts();
    }
  }
  changeState(product: Product) {
    (product.active === 1) ? product.active = 0 : product.active = 1;
    this.productService.changeState(product.id).subscribe(perf => {
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
  changeFilter(pattern) {
    this.pattern = pattern;
    this.inputText = '';
    this.message = '';
  }
  filterProducts(status: number) {
    let searchText = this.input.nativeElement.value;
    if (status != null) {
      searchText = status;
      this.bank = status;
      this.pattern = 'active';
    }
    if (this.pattern !== null) {
      this.productService.filterProducts(this.pattern, searchText, this.perPageCount, this.page).subscribe((perf: any) => {
        this.mapProducts(perf);
      });
    } else {
      this.message = 'Пожалуйста, выберите фильтр';
    }
  }
  removeFilters() {
    this.pattern = null;
    this.inputText = '';
    this.message = '';
    this.changeProducts();
  }

  mapProducts(products: any) {
    this.totalProductsCount = products.total;
    this.productService.changeProducts(products.data.map(data => new Product().deserialize(data)));
  }


}
