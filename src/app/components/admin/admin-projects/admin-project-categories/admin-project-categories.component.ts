import { Component, OnInit } from '@angular/core';
import {ProjectCategory} from '../../../../models/project/projectCategory';
import {ProjectCategoryService} from '../../../../services/project/project-category.service';
import {AuthProductDetailsComponent} from "../../../user/shop/product-details/auth-product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {CreateCategoryComponent} from "./create-category/create-category.component";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-admin-project-categories',
  templateUrl: './admin-project-categories.component.html',
  styleUrls: ['./admin-project-categories.component.css']
})
export class AdminProjectCategoriesComponent implements OnInit {
  categories: ProjectCategory[] = [];
  page = 1;
  perPageCount = 12;
  totalCategoryCount: number;
  searchText = '';
  pattern = 'name';
  translate;
  constructor(
    private projectCategoryService: ProjectCategoryService,
    private dialog: MatDialog,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
    this.projectCategoryService.categories$.subscribe(perf => this.categories = perf);
    this.changeCategory();
  }

  changeCategory() {
    this.categories = null;
    this.projectCategoryService.getAllCategories(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalCategoryCount = perf.total;
      this.projectCategoryService.changeCategories(perf.data.map(data => new ProjectCategory().deserialize(data)));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeCategory();
  }
  addCategory() {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '60%',
      data: {}
    });
  }

  deleteCategory(i) {
    this.projectCategoryService.deleteById(this.categories[i].id).subscribe(perf => {
      this.categories.splice(i, 1);
      this.projectCategoryService.changeCategories(this.categories);
    });
  }
  editCategory(category: ProjectCategory) {
    const dialogRef = this.dialog.open(CreateCategoryComponent, {
      width: '60%',
      data: {
        categoryId: category.id,
      }
    });
  }

}
