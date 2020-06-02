import {Component, Inject, OnInit} from '@angular/core';
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

@Component({
  selector: 'app-bake-project',
  templateUrl: './bake-project.component.html',
  styleUrls: ['./bake-project.component.css']
})
export class BakeProjectComponent implements OnInit {
  project: Project;
  infoForm: FormGroup;
  customSumForm: FormGroup;
  giftedSumForm: FormGroup;
  authorizedUser;
  paymentType: FormGroup;
  gift = null;
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

  ) {
    projectService.findById(data.projectId).subscribe(perf => {
      this.project = perf;
    });
  }
  ngOnInit(): void {
    this.authorizedUser = this.userService.getUser();
    this.initBakeForm();
  }
  initBakeForm() {
    this.infoForm = this.builder.group({
      email: [(this.authorizedUser) ? this.authorizedUser.email : '', [ Validators.required, Validators.email]],
      first_name: [(this.authorizedUser) ? this.authorizedUser.firstname : '', Validators.required],
      last_name: [(this.authorizedUser) ? this.authorizedUser.lastname : '', Validators.required],
      phone_number: [(this.authorizedUser) ? this.authorizedUser.phone_number : '', Validators.required],
    });
    this.customSumForm = this.builder.group({
      sum: ['', Validators.required],
    });
    this.giftedSumForm = this.builder.group({
      sum: ['', Validators.required],
    });
    this.paymentType = this.builder.group({
      type: ['', Validators.required],
    });
  }
  giftSelected(event) {
    console.log(this.project.gifts);
    console.log(this.project.gifts[0]);
    this.customSumForm.patchValue({
      sum: this.project.gifts[event.value].sum
    });
    this.gift = this.project.gifts[event.value].id;
  }
  onSubmit() {
    const customSum = this.customSumForm.controls.sum.value;
    const giftedSum = this.giftedSumForm.controls.sum.value;
    console.log('submit');
    this.infoForm.addControl('project_id', this.builder.control(this.project.id, Validators.required));
    this.infoForm.addControl('user_id', this.builder.control((this.authorizedUser) ? this.authorizedUser.id : '', Validators.required));
    this.infoForm.addControl('sum', this.builder.control( customSum, Validators.required));
    this.infoForm.addControl('paymentType', this.builder.control(this.paymentType.controls.type.value, Validators.required));
    this.infoForm.addControl('gift_id', this.builder.control(this.gift, Validators.required));
    console.log(giftedSum);
    if (this.project.gifts[giftedSum]) {
      this.giftedSumForm.patchValue({
        sum: this.project.gifts[giftedSum].sum
      });
    }
    if (!this.hasGift()) {
      this.infoForm.patchValue({
        gift_id: null
      });
    }
    const projectOrder: ProjectOrder = this.infoForm.getRawValue();
    this.projectOrderService.create(projectOrder).subscribe(perf => {
      window.location.href = perf.url;
      this.openSnackBar('You will be redirected to another page', 'Close', 'style-success');

    }, error => {
      this.openSnackBar('Error with the connection to server', 'Close', 'style-error');

    });
  }
  hasGift() {
    return this.customSumForm.controls.sum.value === this.giftedSumForm.controls.sum.value;
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
