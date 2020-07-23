import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ProjectCategory} from '../../models/project/projectCategory';
import {SlickCarouselComponent} from 'ngx-slick-carousel';
import {UserService} from '../../services/user/user.service';
import {SimpleAuthService} from '../../services/auth.service';
import {OrderProductsService} from '../../services/product/order-products.service';
import {ProjectCategoryService} from '../../services/project/project-category.service';
import {Router} from '@angular/router';
import {AuthService} from 'angularx-social-login';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {Project} from "../../models/project/project";
import {ProjectLike} from "../../models/project/projectLike";
import {LikeService} from "../../services/like.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, tap} from "rxjs/operators";
import {ProjectService} from "../../services/project/project.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, AfterViewInit {
  @ViewChild('input') input: ElementRef;
  inputText = '';
  projects: Project[] = [];
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    nextArrow: '<div class=\'nav-btn next-slide\'> </div>',
    prevArrow: '<div class=\'nav-btn prev-slide\'> </div>',
    infinite: true
  };
  newLike: ProjectLike;
  searchProject = false;
  authorized = false;
  num = 1;
  user: any = null;
  categories: ProjectCategory[] = [];
  categories1: ProjectCategory[] = [];
  productCount = 0;
  @ViewChild('slickModal') slickModal: SlickCarouselComponent;

  constructor(
    private userService: UserService,
    private authService: SimpleAuthService,
    private orderProductsService: OrderProductsService,
    private projectCategory: ProjectCategoryService,
    private router: Router,
    private socialAuthService: AuthService,
    public translate: TranslateService,
    private likeService: LikeService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private projectService: ProjectService
  ) {
    this.langInit();
  }
  langInit() {
    if (!this.translate.getLangs().includes('rus')) {
      this.translate.addLangs(['eng', 'rus', 'kz']);
    }
    this.translate.setDefaultLang('rus');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang.match(/en|rus/) ? browserLang : 'rus');
  }

  ngOnInit(): void {
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
    this.authService.authorized$.subscribe(perf => {
      this.authorized = perf;
      this.handleUser();
    });
    this.categoriesInit();
    this.shopBasketInit();
    $(document).ready(() => {
      const ua = navigator.userAgent;

      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua)) {
        this.slideConfig.slidesToShow = 3;
      }  else {
        this.slideConfig.slidesToShow = 5;

      }
    });
    var _zero_kz_ = _zero_kz_ || [];
    _zero_kz_.push(["id", 68212]);
    // Цвет кнопки
    _zero_kz_.push(["type", 1]);
    // Проверять url каждые 200 мс, при изменении перегружать код счётчика
    // _zero_kz_.push(["url_watcher", 200]);

    (function () {
      var a = document.getElementsByTagName("script")[0],
        s = document.createElement("script");
      s.type = "text/javascript";
      s.async = true;
      s.src = (document.location.protocol == "https:" ? "https:" : "http:")
        + "//c.zero.kz/z.js";
      a.parentNode.insertBefore(s, a);
    })(); //-->

  }
  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(500),
        distinctUntilChanged(),
        tap((text) => {
          const searchText = this.input.nativeElement.value;
          if (searchText !== '') {
            this.searchProject = true;
            this.filterProjects(searchText);
          } else {
            this.searchProject = false;
          }
        })
      )
      .subscribe();
  }

  handleUser() {
    this.socialAuthService.authState.subscribe((user) => {
      this.user = user;
      if (!user) {
        this.user = this.userService.getUser();
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
      this.categories1 = perf.filter(data => (data.id === 10 || data.id === 11 || data.id === 9 || data.id === 14 || data.id === 6 || data.id === 1));
    });
  }

  Logout() {
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
  daysLeft(project: Project) {
    const deadline = project.deadline;
    const d1 = new Date(deadline);
    const d2 = new Date();
    const dif = d1.getTime() - d2.getTime();
    const days = dif / (1000 * 3600 * 24);
    return Math.ceil(days);
  }
  like(project: Project) {
    if (this.authorized) {
      const like: ProjectLike = new ProjectLike();
      like.user_id = this.userService.getUser().id;
      like.project_id = project.id;
      this.newLike = like;

      this.likeService.createProjectLike(like).subscribe(perf => {
        project.likes.push(perf);
        project.liked = true;
      });
    } else {
      this.translate.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });
    }
  }
  unlike(project: Project) {
    if (this.authorized) {
      this.likeService.deleteByIdProjectLike(project.id).subscribe((perf: any) => {
        // tslint:disable-next-line:no-non-null-assertion
        project.likes = project.likes.filter((like: ProjectLike) => like.id !== perf.id);
        project.liked = false;
      });
    } else {
      this.translate.get('user_profile.like_authorized_warning').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-warn');
      });    }
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
  filterProjects(searchText) {
    this.projects = null;
    this.projectService.filterProjectsByName('title_' + this.translate.currentLang, searchText, 100, 1).subscribe((perf: any) => {
        this.mapProjects(perf);
    });
  }
  mapProjects(perf) {
    this.projects = perf.data.map(data => new Project().deserialize(data));
  }

  getImage(n) {
    if ( n === 10) {
      return '../../../assets/images/15_0.png';
    }
    if ( n === 11) {
      return '../../../assets/images/6_0.png';
    }
    if ( n === 14) {
      return '../../../assets/images/29_0.png';
    }
    if ( n === 1) {
      return '../../../assets/images/16_0.png';
    }
    if ( n === 9) {
      return '../../../assets/images/20_0.png';
    }
    if ( n === 6) {
      return '../../../assets/images/44_0.png';
    }
  }
  toggle(){
    console.log(document.getElementById('sidebar').style.display);
  }
}
