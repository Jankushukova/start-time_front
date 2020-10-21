import {AfterViewInit, Component, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../../../../services/product/product.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {OrderProductsService} from '../../../../../services/product/order-products.service';
import {Project} from '../../../../../models/project/project';
import {ProjectService} from '../../../../../services/project/project.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordMatchValidator} from '../../../../register/register.component';
import {User} from '../../../../../models/user/user';
import {UserService} from '../../../../../services/user/user.service';
import {ProjectOrder} from '../../../../../models/project/projectOrder';
import {ProjectOrderService} from '../../../../../services/project/project-order.service';
import {TranslateService} from '@ngx-translate/core';
import {Gift} from "../../../../../models/project/gift";
import {environment} from "../../../../../../environments/environment";
import {MatStepper} from "@angular/material/stepper";
@Component({
  selector: 'app-bake-project',
  templateUrl: './bake-project.component.html',
  styleUrls: ['./bake-project.component.css']
})
export class BakeProjectComponent implements OnInit {

  project: Project;
  authorizedUser;
  gift: Gift = null;
  firstname='';
  lastname='';
  phone_number='';
  sum = 0;
  paymentType=3;
  pay = false;
  order;
  valid = false;
  giftIndex;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    private userService: UserService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private orderProductsService: OrderProductsService,
    private builder: FormBuilder,
    private projectOrderService: ProjectOrderService,
    private translator: TranslateService

  ) {
    projectService.findById(data.projectId).subscribe(perf => {
      this.project = perf;
    });
  }
  ngOnInit(): void {
    this.authorizedUser = this.userService.getUser();
    if(this.authorizedUser){
      this.firstname = this.authorizedUser.firstname;
      this.lastname = this.authorizedUser.lastname;
      this.phone_number = this.authorizedUser.phone_number;
    }


  }


  giftSelected(event) {
    this.gift = this.project.gifts[event.value];
    this.sum = this.gift.sum;
  }

  hasGift() {
    return (this.gift) ? this.sum === this.gift.sum : false;
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
  createOrder(){
    const projectOrder: ProjectOrder = new ProjectOrder();
    projectOrder.first_name = this.firstname;
    projectOrder.last_name = this.lastname;
    projectOrder.phone_number = this.phone_number;
    projectOrder.paymentType = this.paymentType;
    projectOrder.gift_id = (this.hasGift())?this.gift.id:null;
    projectOrder.sum = this.sum;
    projectOrder.project_id = this.project.id;
    projectOrder.user_id = (this.authorizedUser)?this.authorizedUser.id:null;
      this.projectOrderService.create(projectOrder).subscribe(perf => {
        projectOrder.id = perf.id;
        projectOrder.confirmed = perf.confirmed;
        this.order = projectOrder;
        this.CloudPayments();
      });

  }
  CloudPayments() {
    const projectName = (this.translator.currentLang === 'rus') ? this.project.title_rus : (this.translator.currentLang === 'eng') ? this.project.title_eng : this.project.title_kz;
    const giftName = (this.hasGift()) ? this.gift.description : (this.translator.currentLang === 'rus') ? 'Вознаграждения нет' : (this.translator.currentLang === 'eng') ? 'No reward' : 'Сыйақы жоқ';
    const amount = this.order.sum;
    // @ts-ignore
    const widget = new cp.CloudPayments();
      widget.charge({ // options
          publicId: environment.cloudPaymentsPublicId,  // id из личного кабинета
          description: projectName + ', ' + giftName, // назначение
          amount: amount, // сумма
          currency: 'KZT', // валюта
          invoiceId: this.order.id,
          skin: 'classic', // дизайн виджета
          data: {
            myProp: 'myProp value' // произвольный набор параметров
          }
        },
        (options) => { // success
          this.projectOrderService.cloudSuccess(this.order).subscribe(perf2 => {
          });

        },
        (reason, options) => { // fail
        });
  }
}
