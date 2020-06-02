import { Component, OnInit } from '@angular/core';
import {ProjectCategory} from '../../../../models/project/projectCategory';
import {ProjectCategoryService} from '../../../../services/project/project-category.service';

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
  constructor(
    private projectCategoryService: ProjectCategoryService
  ) { }

  ngOnInit(): void {
    this.changeCategory();
  }

  changeCategory() {
    this.categories = null;
    this.projectCategoryService.getAllCategories(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalCategoryCount = perf.total;
      this.categories = perf.data.map(data => new ProjectCategory().deserialize(data));
    });
  }
  changePage(event) {
    this.page = event;
    this.changeCategory();
  }

}
