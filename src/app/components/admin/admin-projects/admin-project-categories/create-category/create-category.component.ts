import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../../../../services/project/project.service";
import {ProjectCategory} from "../../../../../models/project/projectCategory";
import {ProjectCategoryService} from "../../../../../services/project/project-category.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: FormGroup;
  category: ProjectCategory;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectCategoryService: ProjectCategoryService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
    if ( this.data.categoryId) {
      this.projectCategoryService.findById(this.data.categoryId).subscribe(perf => {
        this.category = perf;
        this.assignOldValues();
      });
    }
    this.initCategoryForm();
  }
  assignOldValues() {
    this.categoryForm.patchValue({
      name_rus: this.category.name_rus,
      name_kz: this.category.name_kz,
      name_eng: this.category.name_eng
    });
  }
  initCategoryForm() {
    this.categoryForm = this.builder.group({
      name_rus: ['', [Validators.required]],
      name_kz: ['', [Validators.required]],
      name_eng: ['', [Validators.required]],
    });
  }
  onSubmitCategoryForm() {
    if (!this.category) {
      let category: ProjectCategory = this.categoryForm.getRawValue();
      this.projectCategoryService.create(category).subscribe(perf => {
        category = new ProjectCategory().deserialize(perf);
        category.projects = [];
        let categories: ProjectCategory[] = [];
        this.projectCategoryService.categories$.subscribe(res => categories = res);
        categories.push(category);
        this.projectCategoryService.changeCategories(categories);
      });
    } else {
      this.category.name_rus = this.categoryForm.controls.name_rus.value;
      this.category.name_kz = this.categoryForm.controls.name_kz.value;
      this.category.name_eng = this.categoryForm.controls.name_eng.value;
      this.projectCategoryService.update(this.category.id, this.category).subscribe(perf => {
        let categories: ProjectCategory[] = [];
        this.projectCategoryService.categories$.subscribe(res => {
          categories = res;
          });
        categories = categories.map( data =>  {
          if (data.id === this.category.id) {
            data = this.category;
          }
          return data;
        });
        this.projectCategoryService.changeCategories(categories);
        });
    }

  }
}
