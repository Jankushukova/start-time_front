import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {SimpleAuthService} from "../../../../../../services/auth.service";
import {UserService} from "../../../../../../services/user/user.service";
import {ProjectOrderService} from "../../../../../../services/project/project-order.service";
// @ts-ignore
import bootbox = require('bootbox');
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-kaspi-result',
  templateUrl: './kaspi-result.component.html',
  styleUrls: ['./kaspi-result.component.css']
})
export class KaspiResultComponent implements OnInit {
  code = 1;
  loading = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private authService: SimpleAuthService,
    private userService: UserService,
    private projectOrderService: ProjectOrderService,
    private router: Router,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    this.translator.addLangs(['eng', 'rus', 'kz']);
    this.translator.setDefaultLang('rus');
    const browserLang = this.translator.getBrowserLang();
    this.translator.use(browserLang.match(/en|rus/) ? browserLang : 'rus');
    this.route.queryParams.subscribe(params => {
      const amount = params.Amount;
      const tranId = params.TranId;
      const orderId = params.OrderId;
      const resultCode = params.ResultCode;
      this.code = resultCode;
      this.projectOrderService.resultKaspi(amount, resultCode, orderId).subscribe(perf => {
        this.loading = true;
        if (this.code == -1) {
          this.translator.get('payment.success').subscribe(perf2 => {
            this.openB(perf2);
          });
        } else {
          this.translator.get('payment.failure').subscribe(perf2 => {
            this.openB(perf2);
          });
        }
        this.router.navigateByUrl('/');
      });
    });
  }
  openB(text) {
    let title;
    this.translator.get('create.no_contact_info_title').subscribe(perf => title = perf);
    bootbox.alert({
      title: title,
      message: text,
    });
  }

}
