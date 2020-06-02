import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../services/project/project.service';
import {Project} from '../../../models/project/project';
import {User} from '../../../models/user/user';
import {UserService} from '../../../services/user/user.service';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {Product} from '../../../models/product/product';
import {ProductService} from '../../../services/product/product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SubscriberService} from '../../../services/user/subscriber.service';
import {Subscription} from '../../../models/user/subscription';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthProductDetailsComponent} from '../shop/product-details/auth-product-details.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.css']
})
export class AuthMainComponent implements OnInit {

  constructor(
    private projectService: ProjectService,
    private productService: ProductService,
    private userService: UserService,
    private subscriberService: SubscriberService,
    private builder: FormBuilder,
    private dialog: MatDialog,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,


  ) { }
  mostPopularProjects: Project[] = null;
  mostPopularProducts: Product[] = null;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  partners: User[] = [];
  projectNum = 0;
  sucProjNum = 0;
  projectBakNum = 0;
  subscribeForm: FormGroup;


  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: '<div class=\'nav-btn next-slide\'></div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'></div>',
    dots: true,
    infinite: false
  };




  ngOnInit(): void {
    this.getPopularProjects();
    this.getPopularProducts();
    this.getPartners();
    this.getStatistics();
    this.initSubscribeForm();
  }

  initSubscribeForm() {
    this.subscribeForm = this.builder.group({
      email: ['', [Validators.required]], });
  }
  getPartners() {
    this.userService.getPartners().subscribe(perf => {
      this.partners = perf;
    });
  }
  getPopularProducts() {
    this.productService.getMostPopular().subscribe(perf => {
      this.mostPopularProducts = perf;
    });
  }
  getPopularProjects() {
    this.projectService.getMostPopular().subscribe(perf => {
      this.mostPopularProjects = perf;
    });
  }
  getStatistics() {
    this.projectService.getStatisticsProject().subscribe(perf => {
      this.projectNum = perf;
    });
    this.projectService.getStatisticsSuccessfulProject().subscribe(perf => {
      this.sucProjNum = perf;
    });
    this.projectService.getStatisticsBackers().subscribe(perf => {
      this.projectBakNum = perf;
    });
  }
  next() {
    this.slickModal.slickNext();
  }
  prev() {
    this.slickModal.slickPrev();
  }
  onSubmit() {
    const subscription: Subscription = this.subscribeForm.getRawValue();
    this.subscriberService.create(subscription).subscribe(perf => {
      this.openSnackBar('Successfully subscribed', 'Close', 'style-success');
    }, error => {
      this.openSnackBar('Some error occurred', 'Close', 'style-error');
    });
    this.subscribeForm.reset();
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
  openDialog(product: Product) {
    const dialogRef = this.dialog.open(AuthProductDetailsComponent, {
      data: {
        productId: product.id,
      },
      width: '60%'
    });
  }
}
