import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Project} from '../../../../models/project/project';
import {ProjectService} from '../../../../services/project/project.service';
import {User} from '../../../../models/user/user';
import {Payment} from "../../../../models/payment";
import {Gift} from "../../../../models/project/gift";
import {ProjectOrder} from "../../../../models/project/projectOrder";
import {PaymentType} from "../../../../models/paymentType";
import {TranslateService} from "@ngx-translate/core";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import * as FileSaver from 'file-saver';
@Component({
  selector: 'app-admin-bakes',
  templateUrl: './admin-bakes.component.html',
  styleUrls: ['./admin-bakes.component.css']
})
export class AdminBakesComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  bakeInformation: any[] = [];
  page = 1;
  perPageCount = 12;
  totalBakersCount: number;
  trans;
  pattern = null;
  text = '';
  message = '';
  excel = [];
  isBank: boolean = false;
  constructor(
    private projectService: ProjectService,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    this.changeBakers();
    this.trans = this.translator;
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

  changeBakers() {
    this.bakeInformation = null;
    this.projectService.getAllBakers(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.assignProjectData(perf);
      console.log(this.bakeInformation);
    });
  }
  changePage(event) {
    this.page = event;
    if (this.pattern !== null) {
      (this.isBank) ? this.filterByBank(this.pattern) : this.filterProjects(this.text);
    } else {
      this.changeBakers();
    }
  }
  changeFilter(pattern) {
    this.pattern = pattern;
    this.text = '';
    this.isBank = false;
  }
  filterByBank(id: number) {
    this.page = 1;
    this.isBank = true;
    this.pattern = id;
    this.projectService.getBakersOfBank(id, this.perPageCount, this.page).subscribe((perf: any) => {
      this.assignProjectData(perf);
    });
  }
  assignProjectData(perf: any) {
    this.totalBakersCount = perf.total;
    this.bakeInformation = perf.data.map((data): any => {
      data.order = (new ProjectOrder()).deserialize(data.order);
      data.bank = (new PaymentType()).deserialize(data.bank);
      return data;
    });
  }
  downloadExcel() {
    this.projectService.downloadExcel().subscribe(perf => {
      console.log('downloaded');
      console.log(perf);
      const blob = new Blob([perf], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      FileSaver.saveAs(blob, 'start-time-bakers.xlsx');
    });
  }
  removeFilters() {
    this.pattern = null;
    this.text = '';
    this.message = '';
    this.changeBakers();
  }
  filterProjects(searchText) {
    if (this.pattern !== '' && !this.isBank) {
      this.message = '';
      this.projectService.filterProjectOrders(this.pattern, searchText, this.perPageCount, this.page).subscribe((perf: any) => {
        this.assignProjectData(perf);
      });
    } else {
      this.message = 'please choose filter';
    }
  }
}
