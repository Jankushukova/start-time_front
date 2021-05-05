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
import {TranslateService} from '@ngx-translate/core';
import {ProjectLike} from "../../../models/project/projectLike";

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
    private translator: TranslateService


  ) { }
  mostPopularProjects: Project[] = null;
  mostPopularProducts: Product[] = null;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  partners: any[] = [];
  projectNum = 0;
  sucProjNum = 0;
  projectBakNum = 0;
  userNum = 0;
  subscribeForm: FormGroup;
  translate;
  mobile = false;
  projects: Project[] = [];
  page = 1;
  slideConfig = {
    slidesToShow: 5,
    slidesToScroll: 1,
    infinite: true
  };
  slideConfig1 = {
    slidesToShow: 3,
    slidesToScroll: 3,
    infinite: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
          arrows: false,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          arrows: false,
        }
      }
    ]
  };




  ngOnInit(): void {
    this.translate = this.translator;
    this.getPopularProjects();
    this.getPopularProducts();
    this.getPartners();
    this.getStatistics();
    this.initSubscribeForm();
    $(document).ready(() => {
      const ua = navigator.userAgent;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
        this.mobile = true;
      } else {
        this.mobile = false;
      }
    });
    this.changeProjects();
  }

  changeProjects() {
    this.projectService.getLastProjects().subscribe((perf: any) => {
      this.projects = perf.map(data => new Project().deserialize(data));

    });
  }
  initSubscribeForm() {
    this.subscribeForm = this.builder.group({
      email: ['', [Validators.required]], });
  }
  getPartners() {
    this.userService.getAllPartners().subscribe(perf => {
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
    this.projectService.getStatisticsUsers().subscribe(perf => {
      this.userNum = perf;
    });
  }
  next() {
    this.slickModal.slickNext();
    console.log('next');
  }
  prev() {
    this.slickModal.slickPrev();
    console.log('prev');
  }
  onSubmit() {
    const subscription: Subscription = this.subscribeForm.getRawValue();
    this.subscriberService.create(subscription).subscribe(perf => {
      this.translator.get('main.subscribe_success').subscribe( perf2 => {
        this.openSnackBar(perf2, 'Close', 'style-success');
      });
    }, error => {
      this.translator.get('main.subscribe_error').subscribe(perf2 => {
        this.openSnackBar(perf2, 'Close', 'style-error');
      });
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
      width: (this.mobile) ? '100%' : '60%'
    });
  }
  daysLeft(project: Project) {
    const deadline = project.deadline;
    const d1 = new Date(deadline);
    const d2 = new Date();
    const dif = d1.getTime() - d2.getTime();
    const days = dif / (1000 * 3600 * 24);
    return Math.ceil(days);
  }
  progress(project: Project) {
    return Math.ceil(( parseInt(project.gathered, 10) /  parseInt(project.goal, 10))  * 100 );
  }
  inLocale(sum) {
    return parseInt(sum, 10).toLocaleString();
  }

}
