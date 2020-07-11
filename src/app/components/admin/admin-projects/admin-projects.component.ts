import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Project} from "../../../models/project/project";
import {ProjectService} from "../../../services/project/project.service";
import {UserService} from "../../../services/user/user.service";
import {SimpleAuthService} from "../../../services/auth.service";
import {Product} from "../../../models/product/product";
import {AuthProductDetailsComponent} from "../../user/shop/product-details/auth-product-details.component";
import {MatDialog} from "@angular/material/dialog";
import {ProjectEditComponent} from "./project-edit/project-edit.component";
import {filter, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import {fromEvent} from "rxjs";
import {ProjectCategory} from "../../../models/project/projectCategory";
import {ProjectCategoryService} from "../../../services/project/project-category.service";
import {Translator} from "@angular/localize/src/tools/src/translate/translator";
import {TranslateService} from "@ngx-translate/core";
import * as FileSaver from 'file-saver';
// @ts-ignore
import bootbox = require('bootbox');

@Component({
  selector: 'app-admin-projects',
  templateUrl: './admin-projects.component.html',
  styleUrls: ['./admin-projects.component.css']
})
export class AdminProjectsComponent implements AfterViewInit, OnInit {
  @ViewChild('input') input: ElementRef;
  projects: Project[] = [];
  categoryId: number;
  page = 1;
  perPageCount = 12;
  totalProjectsCount: number;
  pattern = null;
  allCategory: ProjectCategory[] = [];
  message = '';
  trans;
  inputText = '';
  isCategory: boolean;
  constructor(
    private projectService: ProjectService,
    private userService: UserService,
    private authService: SimpleAuthService,
    private dialog: MatDialog,
    private projectCategoryService: ProjectCategoryService,
    private translateService: TranslateService
  ) { }

  ngOnInit(): void {
    this.projectService.projects$.subscribe(perf => this.projects = perf);
    this.changeProjects();
    this.projectCategoryService.get().subscribe(perf => {
      this.allCategory = perf;
    });
    this.trans = this.translateService;
  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          const searchText = this.input.nativeElement.value;
          this.page = 1;
          this.filterProjects(searchText);
        })
      )
      .subscribe();
  }

  changeProjects() {
    this.projects = null;
    this.projectService.getAllProjects(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.mapProjects(perf);
    });
  }
  changePage(event) {
    this.page = event;
    if (this.pattern !== null) {
      if (!this.isCategory) {
        this.filterProjects(this.inputText);
      } else {
        this.filterCategory(this.pattern);
      }
    } else {
      this.changeProjects();
    }
  }

  changeActiveState(project: Project, state) {
    project.active = state;
    this.projectService.changeActiveState(project, state).subscribe((perf: any) => {
    });
  }
  openDialog(project: Project) {
    const dialogRef = this.dialog.open(ProjectEditComponent, {
      data: {
        projectId: project.id,
      },
      width: '90%'
    });
  }
  changeFilter(option, text) {
    this.isCategory = false;
    this.pattern = option;
    if (text !== null) {
      this.filterProjects(text);
    }
  }
  filterCategory(option) {
    this.projects = null;
    this.isCategory = true;
    this.pattern = option;
    this.projectService.getProjectsOfCategory(option, this.perPageCount, this.page).subscribe((perf: any) => {
      this.mapProjects(perf);
    });
  }
  removeFilters() {
    this.pattern = null;
    this.inputText = '';
    this.message = '';
    this.changeProjects();
  }
  mapProjects(perf) {
    this.totalProjectsCount = perf.total;
    this.projectService.changeProjects(perf.data.map(data => new Project().deserialize(data)));
  }
  filterProjects(searchText) {
    this.projects = null;
    if (this.pattern !== null) {
    this.message = '';
    this.projectService.filterProjects(this.pattern, searchText, this.perPageCount, this.page).subscribe((perf: any) => {
      this.mapProjects(perf);
    });
  } else {
    this.message = 'Пожалуйста, выберите фильтр';
  }
  }

  deleteProject(project: Project, i) {
    this.openB(project, i);
  }
  downloadExcel(project) {
    this.projectService.downloadExcel(project.id).subscribe(perf => {
      const blob = new Blob([perf], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      FileSaver.saveAs(blob, 'start-time-bakers.xlsx');
    });
  }
  openB(project, i) {
    bootbox.confirm({
      title: 'Сообщение',
      message: 'Вы действительно хотите удалить проект?',
      callback:  (result) => {
        if (result) {
          this.projectService.deleteById(project.id).subscribe(perf => {
            this.projects.splice(i, 1);
          });
        }
      }
    });
  }
}
