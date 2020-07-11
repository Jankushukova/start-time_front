import { Component, OnInit } from '@angular/core';
import {UserService} from "../../../services/user/user.service";
import {CreateNewsComponent} from "../admin-news/create-news/create-news.component";
import {MatDialog} from "@angular/material/dialog";
import {CreatePartnerComponent} from "./create-partner/create-partner.component";

@Component({
  selector: 'app-admin-partners',
  templateUrl: './admin-partners.component.html',
  styleUrls: ['./admin-partners.component.css']
})
export class AdminPartnersComponent implements OnInit {
  partners: any[] = [];
  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.userService.partners$.subscribe(perf => this.partners = perf);
    this.userService.getAllPartners().subscribe(perf => {
      this.userService.changePartners(perf);
    });
  }
  addPartner() {
    const dialogRef = this.dialog.open(CreatePartnerComponent, {
      data: {
      },
      width: '60%'
    });
  }

  delete(partner, i) {
    this.userService.deletePartner(partner.id).subscribe(perf => {
      let partners = [];
      this.userService.partners$.subscribe(perf2 => partners = perf2);
      partners.splice(i, 1);
      this.userService.changePartners(partners);
    });
  }
}
