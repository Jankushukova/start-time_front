import { Component, OnInit } from '@angular/core';
import {Project} from '../../../../models/project/project';
import {ProjectService} from '../../../../services/project/project.service';
import {User} from '../../../../models/user/user';
import {Payment} from "../../../../models/payment";
import {Gift} from "../../../../models/project/gift";
import {ProjectOrder} from "../../../../models/project/projectOrder";
import {PaymentType} from "../../../../models/paymentType";

@Component({
  selector: 'app-admin-bakes',
  templateUrl: './admin-bakes.component.html',
  styleUrls: ['./admin-bakes.component.css']
})
export class AdminBakesComponent implements OnInit {
  bakeInformation: any[] = [];
  page = 1;
  perPageCount = 12;
  totalBakersCount: number;
  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.changeBakers();
  }

  changeBakers() {
    this.bakeInformation = null;
    this.projectService.getAllBakers(this.perPageCount, this.page ).subscribe((perf: any) => {
      this.totalBakersCount = perf.total;
      this.bakeInformation = perf.data.map((data): any => {
        data.order = (new ProjectOrder()).deserialize(data.order);
        data.bank = (new PaymentType()).deserialize(data.bank);
        return data;
      });
      console.log(this.bakeInformation);
    });
  }
  changePage(event) {
    this.page = event;
    this.changeBakers();
  }
}
