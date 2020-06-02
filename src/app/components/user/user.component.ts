import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectCategory} from '../../models/project/projectCategory';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {UserService} from '../../services/user/user.service';
import {SimpleAuthService} from '../../services/auth.service';
import {OrderProductsService} from '../../services/product/order-products.service';
import {ProjectCategoryService} from '../../services/project/project-category.service';
import {Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  slideConfig = {
    slidesToShow: 4,
    slidesToScroll: 1,
    dots: true,
    nextArrow: '<div class=\'nav-btn next-slide\'> </div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'> </div>',
    infinite: false
  };
  authorized = false;
  num = 1;
  user: any = null;
  categories: ProjectCategory[] = [];
  productCount = 0;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;
  constructor(
    private userService: UserService,
    private authService: SimpleAuthService,
    private orderProductsService: OrderProductsService,
    private projectCategory: ProjectCategoryService,
    private router: Router,
    private socialAuthService: AuthService,
    public translate: TranslateService
  ) {
    this.langInit();
  }
  langInit() {
    this.translate.addLangs(['eng', 'rus', 'kz']);
    this.translate.setDefaultLang('rus');
    const  browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|rus/) ? browserLang : 'rus');
  }

  ngOnInit(): void {
    console.log(this.authService.getToken());
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
      this.handleUser();

      console.log(perf);
    });
    this.categoriesInit();
    this.shopBasketInit();
    // jQuery('.dropdown-toggle').on('click', (e) =>  {
    //   $(this).next().toggle();
    // });
    // jQuery('.dropdown-menu.keep-open').on('click',  (e) =>  {
    //   e.stopPropagation();
    // });
  }
  handleUser() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      if (!user) {
        this.user =  this.userService.getUser();
      }
    });
  }
  shopBasketInit() {
    this.orderProductsService.data$.subscribe(res => {
      this.productCount = 0;
      res.map(data => this.productCount += data.count);
    });
  }
  categoriesInit() {
    this.projectCategory.get().subscribe(perf => {
      this.categories = perf;
    });
  }
  Logout() {
    console.log('logout');
    this.socialAuthService.authState.subscribe(user => {
      if (user) {
        this.signOutFB();
      }
    });
    this.userService.logout();
    this.router.navigateByUrl('/login');

  }
  signOutFB(): void {
    this.socialAuthService.signOut();
  }
  getDate() {
    const date: Date = new Date();
    return date.getFullYear();
  }

  slickInit(e) {
  }

  breakpoint(e) {
  }

  afterChange(e) {
  }

  beforeChange(e) {
  }

  next() {
    this.slickModal.slickNext();
  }

  prev() {
    this.slickModal.slickPrev();
  }
}
