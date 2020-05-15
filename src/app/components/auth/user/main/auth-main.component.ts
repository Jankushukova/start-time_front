import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectService} from '../../../../services/project/project.service';
import {Project} from '../../../../models/project/project';
import {User} from '../../../../models/user/user';
import {UserService} from '../../../../services/user/user.service';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {Product} from '../../../../models/product/product';
import {ProductService} from '../../../../services/product/product.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SubscriberService} from "../../../../services/user/subscriber.service";
import {Subscription} from "../../../../models/user/subscription";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-main',
  templateUrl: './auth-main.component.html',
  styleUrls: ['./auth-main.component.css']
})
export class AuthMainComponent implements OnInit {
  mostPopularProjects: Project[] = null;
  mostPopularProducts: Product[] = null;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  partners: User[] = [];
  projectNum = 0;
  sucProjNum = 0;
  projectBakNum = 0;
  subscribeForm: FormGroup;

  constructor(
    private projectService: ProjectService,
    private productService: ProductService,
    private userService: UserService,
    private subscriberService: SubscriberService,
    private builder: FormBuilder,
    private _snackBar: MatSnackBar,


  ) { }




  ngOnInit(): void {
    this.projectService.getMostPopular().subscribe(perf =>{
      this.mostPopularProjects = perf;
    });
    this.productService.getMostPopular().subscribe(perf =>{
      this.mostPopularProducts = perf;
    })
    this.userService.getPartners().subscribe(perf=>{
      this.partners = perf;
    })
    this.projectService.getStatisticsProject().subscribe(perf=>{
      this.projectNum = perf;
    })
    this.projectService.getStatisticsSuccessfulProject().subscribe(perf=>{
      this.sucProjNum = perf;
    })
    this.projectService.getStatisticsBackers().subscribe(perf=>{
      this.projectBakNum = perf;
    })

    $('.counter-count').each(function () {
      $(this).prop('Counter',0).animate({
        Counter: $(this).text()
      }, {
        duration: 5000,
        easing: 'swing',
        step: function (now) {
          $(this).text(Math.ceil(now));
        }
      });
    });

    this.subscribeForm = this.builder.group({
      email: ['', [Validators.required]],});
  }

  title = 'ngSlick';


  slides = [342, 453, 846, 855, 234, 564, 744, 243];

  slideConfig = {
    "slidesToShow": 4,
    "slidesToScroll": 1,
    "nextArrow": "<div class='nav-btn next-slide'></div>",
    "prevArrow": "<div class='nav-btn prev-slide'></div>",
    "dots": true,
    "infinite": false
  };





  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }

  onSubmit(){
    const subscription: Subscription = this.subscribeForm.getRawValue();
    this.subscriberService.create(subscription).subscribe(perf=>{
      console.log("success");
      this.openSnackBar('Successfully subscribed', 'Close', 'style-success');

    }, error => {
      this.openSnackBar('Some error occurred', 'Close', 'style-error');
    })

    this.subscribeForm.reset();
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition:'right',
    });
  }
}
