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
  gift: Gift = null;
  user: User;
  sum = 0;
  order;
  valid = false;
  step = 1;
  checked = false;
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
    let authorizedUser = this.userService.getUser();
    if(authorizedUser){
      this.user = authorizedUser;
    }else{
      this.user = new User();
    }
  }

  changeStep(step){
    this.step = step;
  }
  changeStepAndSum(step,gift){
    this.step = step;

    if(gift){
      this.sum = gift.sum;
      this.gift = gift;
    }else{
      this.sum = 0;
      this.gift = null;
    }

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
    projectOrder.first_name = this.user.firstname;
    projectOrder.last_name = this.user.lastname;
    projectOrder.phone_number = this.user.phone_number;
    projectOrder.email = this.user.email;
    projectOrder.paymentType = 3;
    projectOrder.gift_id = (this.hasGift())?this.gift.id:null;
    projectOrder.sum = this.sum;
    projectOrder.project_id = this.project.id;
    projectOrder.user_id = (this.user.id)?this.user.id:null;
      this.projectOrderService.create(projectOrder).subscribe(perf => {
        projectOrder.id = perf.id;
        projectOrder.confirmed = perf.confirmed;
        this.CloudPayments(projectOrder);
      });

  }
  CloudPayments(order) {
    const projectName = (this.translator.currentLang === 'rus') ? this.project.title_rus : (this.translator.currentLang === 'eng') ? this.project.title_eng : this.project.title_kz;
    const giftName = (this.hasGift()) ? this.gift.description : (this.translator.currentLang === 'rus') ? 'Вознаграждения нет' : (this.translator.currentLang === 'eng') ? 'No reward' : 'Сыйақы жоқ';
    const amount = order.sum;
    // @ts-ignore
    const widget = new cp.CloudPayments();
      widget.charge({ // options
          publicId: environment.cloudPaymentsPublicId,  // id из личного кабинета
          description: projectName + ', ' + giftName, // назначение
          amount: amount, // сумма
          currency: 'KZT', // валюта
          invoiceId: order.id,
          skin: 'classic', // дизайн виджета
          data: {
            myProp: 'myProp value' // произвольный набор параметров
          }
        },
        (options) => { // success
          this.projectOrderService.cloudSuccess(order).subscribe(perf2 => {

          });

        },
        (reason, options) => { // fail

        });
  }
}
