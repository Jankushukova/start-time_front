import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AdminComponent } from './components/admin/admin.component';
import { UserProfileComponent } from './components/user/profile/user-profile.component';
import { UserProjectsComponent } from './components/user/profile/projects/user-projects.component';
import { AuthCreateProjectComponent } from './components/user/create-project/auth-create-project.component';
import { RecommendationComponent } from './components/user/profile/recommendation/recommendation.component';
import {AuthAboutComponent} from './components/user/about/auth-about.component';
import {AuthCategoryComponent} from './components/user/category/auth-category.component';
import {AuthDetailsComponent} from './components/user/category/details/auth-details.component';
import {AuthInformationComponent} from './components/user/category/details/information/auth-information.component';
import {AuthUpdateComponent} from './components/user/category/details/information/update/auth-update.component';
import {AuthQuestionComponent} from './components/user/category/details/information/question/auth-question.component';
import {AuthDescriptionComponent} from './components/user/category/details/information/description/auth-description.component';
import {AuthContactComponent} from './components/user/contact/auth-contact.component';
import {AuthHelpComponent} from './components/user/help/auth-help.component';
import {AuthMainComponent} from './components/user/main/auth-main.component';
import {AuthNewsComponent} from './components/user/news/auth-news.component';
import {AuthNewsDetailsComponent} from './components/user/news/news-details/auth-news-details.component';
import {AuthShopComponent} from './components/user/shop/auth-shop.component';
import {AuthProductDetailsComponent} from './components/user/shop/product-details/auth-product-details.component';
import {AuthCommentComponent} from './components/user/category/details/information/comment/auth-comment.component';
import {AuthUserProfileComponent} from './components/user/auth-user-profile/auth-user-profile.component';
import {AuthUserProjectsComponent} from './components/user/auth-user-profile/auth-user-projects/auth-user-projects.component';
import { UserInformationComponent } from './components/user/profile/user-information/user-information.component';
import { AuthUserInfromationComponent } from './components/user/auth-user-profile/auth-user-infromation/auth-user-infromation.component';
import { SidebarComponent } from './components/admin/sidebar/sidebar.component';
import { AdminProjectsComponent } from './components/admin/admin-projects/admin-projects.component';
import { AdminShopComponent } from './components/admin/admin-shop/admin-shop.component';
import { AdminSubscribesComponent } from './components/admin/admin-subscribes/admin-subscribes.component';
import { AdminPartnersComponent } from './components/admin/admin-partners/admin-partners.component';
import { AdminUsersComponent } from './components/admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './components/admin/admin-shop/admin-orders/admin-orders.component';
import { AdminProjectCategoriesComponent } from './components/admin/admin-projects/admin-project-categories/admin-project-categories.component';
import { AdminBakesComponent } from './components/admin/admin-projects/admin-bakes/admin-bakes.component';
import { AdminMainComponent } from './components/admin/admin-main/admin-main.component';
import { ModeratorLoginComponent } from './components/moderator-login/moderator-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {EditorModule} from '@tinymce/tinymce-angular';
import {TokenInterceptor} from './interceptors/token';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {SlickCarouselModule} from 'ngx-slick-carousel';
import { AuthCommentEntityComponent } from './components/user/category/details/information/comment/auth-comment-entity/auth-comment-entity.component';
import { AuthQuestionEntityComponent } from './components/user/category/details/information/question/auth-question-entity/auth-question-entity.component';
import { AuthUpdateEntityComponent } from './components/user/category/details/information/update/auth-update-entity/auth-update-entity.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import { AuthUserProjectEntityComponent } from './components/user/auth-user-profile/auth-user-projects/auth-user-project-entity/auth-user-project-entity.component';
import { AuthUpdateDetailsComponent } from './components/user/category/details/information/update/auth-update-details/auth-update-details.component';
import {MatListModule} from '@angular/material/list';
import { AuthNewsEntityComponent } from './components/user/news/auth-news-entity/auth-news-entity.component';
import { AuthNewsCommentComponent } from './components/user/news/news-details/auth-news-comment/auth-news-comment.component';
import {NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { SpinnerComponent } from './components/spinner/spinner.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { OrderSubmitFormComponent } from './components/user/shop/order-submit-form/order-submit-form.component';
import {NgxMatIntlTelInputModule} from 'ngx-mat-intl-tel-input';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import {AuthServiceConfig, FacebookLoginProvider, LoginOpt, SocialLoginModule} from 'angularx-social-login';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient} from '@angular/common/http';
import {environment} from '../environments/environment';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoginComponent} from './components/login/login.component';
import {ResetPasswordComponent} from './components/login/reset-password/reset-password.component';
import {RegisterComponent} from './components/register/register.component';
import { UserComponent } from './components/user/user.component';
import {MatExpansionModule} from "@angular/material/expansion";
import { BakeProjectComponent } from './components/user/category/details/bake-project/bake-project.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatRadioModule} from "@angular/material/radio";
import {MatStepperModule} from "@angular/material/stepper";
import { ProjectEditComponent } from './components/admin/admin-projects/project-edit/project-edit.component';
import { EditUnactiveProjectComponent } from './components/user/profile/projects/edit-unactive-project/edit-unactive-project.component';
import { CreateUpdateComponent } from './components/user/category/details/information/update/create-update/create-update.component';
import { CreateCategoryComponent } from './components/admin/admin-projects/admin-project-categories/create-category/create-category.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import { AdminEditUserComponent } from './components/admin/admin-users/admin-edit-user/admin-edit-user.component';
import { AdminNewsComponent } from './components/admin/admin-news/admin-news.component';
import { CreateNewsComponent } from './components/admin/admin-news/create-news/create-news.component';
import { FilterPipe } from './pipe/filter.pipe';
import {MatChipsModule} from "@angular/material/chips";
import { AgmCoreModule } from '@agm/core';
import {GoogleMapsModule} from "@angular/google-maps";
import { AddProductToFinishedProjectComponent } from './components/user/profile/projects/add-product-to-finished-project/add-product-to-finished-project.component';
import { ProductsComponent } from './components/user/profile/products/products.component';
import { EditProductComponent } from './components/admin/admin-shop/edit-product/edit-product.component';
import { ProductsViewComponent } from './components/admin/admin-shop/admin-orders/products-view/products-view.component';
import { AddPopularComponent } from './components/admin/admin-main/add-popular/add-popular.component';
import { CreatePartnerComponent } from './components/admin/admin-partners/create-partner/create-partner.component';
import { ProjectBakersComponent } from './components/user/category/details/information/project-bakers/project-bakers.component';
import { ProjectsComponent } from './components/user/projects/projects.component';
import { KaspiResultComponent } from './components/user/category/details/bake-project/kaspi-result/kaspi-result.component';
const routes: Routes = [
  {path: '', component: UserComponent,
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent},
      {path: 'reset/password', component: ResetPasswordComponent},
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: AuthMainComponent},
      {path: 'news', component: AuthNewsComponent},
      {path: 'contact', component: AuthContactComponent},
      {path: 'help', component: AuthHelpComponent},
      {path: 'about', component: AuthAboutComponent},
      {path: 'shop', component: AuthShopComponent},
      {path: 'projects', component: ProjectsComponent},
      {path: 'category/:id', component: AuthCategoryComponent},
      {path: 'project/details/:id', component: AuthDetailsComponent,
        children: [
          {path: '', redirectTo: 'description', pathMatch: 'full'},
          {path: 'description', component: AuthDescriptionComponent},
          {path: 'comments', component: AuthCommentComponent},
          {path: 'updates', component: AuthUpdateComponent},
          {path: 'questions', component: AuthQuestionComponent},
        ]
      },
      {path: 'updates/details/:id', component: AuthUpdateDetailsComponent},
      {path: 'userProfile/:id', component: AuthUserProfileComponent,
        children: [
          {path: '', redirectTo: 'projects', pathMatch: 'full'},
          {path: 'projects', component: AuthUserProjectsComponent},
          {path: 'information', component: AuthUserInfromationComponent},
        ]},
      {path: 'productDetail/:id', component: AuthProductDetailsComponent},
      {path: 'newsDetail/:id', component: AuthNewsDetailsComponent},
      {path: 'create', component: AuthCreateProjectComponent},
      {path: 'home', component: UserProfileComponent,
        children: [
          {path: '', redirectTo: 'information', pathMatch: 'full'},
          {path: 'recommendation', component: RecommendationComponent},
          {path: 'projects', component: UserProjectsComponent},
          {path: 'products', component: ProductsComponent},
          {path: 'information', component: UserInformationComponent},

        ]
      },
      {path: 'order/product', component: OrderSubmitFormComponent},

    ]
  },
  {path: 'admin', component: AdminComponent,
    children: [
      {path: '', redirectTo: 'projects', pathMatch: 'full'},
      {path: 'main', component: AdminMainComponent},
      {path: 'projects', component: AdminProjectsComponent},
      {path: 'shop', component: AdminShopComponent},
      {path: 'subscribes', component: AdminSubscribesComponent},
      {path: 'partners', component: AdminPartnersComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'news', component: AdminNewsComponent},
      {path: 'project/bakes', component: AdminBakesComponent},
      {path: 'project/edit/:id', component: ProjectEditComponent},
      {path: 'project/category', component: AdminProjectCategoriesComponent},
      {path: 'shop/orders', component: AdminOrdersComponent},
    ]
  },
  {path: 'start-time/moderator', component: ModeratorLoginComponent},
  // {path: '', redirectTo: 'start', pathMatch: 'full'},
  {path: 'verify-email', component: EmailConfirmationComponent},
  {path: 'result', component: KaspiResultComponent},

];

const fbLoginOptions: LoginOpt = {
  scope: 'email,public_profile',
  return_scopes: true,
  enable_profile_selector: true
};

const config = new AuthServiceConfig([
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider(environment.facebookAppId, fbLoginOptions)
  }

]);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    // unauthorized
    LoginComponent,
    RegisterComponent,
    // authorized
    // user
    AuthAboutComponent,
    AuthCategoryComponent,
    AuthDetailsComponent,
    AuthInformationComponent,
    AuthUpdateComponent,
    AuthQuestionComponent,
    AuthDescriptionComponent,
    AuthCommentComponent,
    AuthContactComponent,
    AuthCreateProjectComponent,
    AuthHelpComponent,
    AuthMainComponent,
    AuthNewsComponent,
    AuthNewsDetailsComponent,
    AuthShopComponent,
    AuthProductDetailsComponent,
    UserProfileComponent,
    UserProjectsComponent,
    RecommendationComponent,
    AuthUserProfileComponent,
    UserInformationComponent,
    AuthUserInfromationComponent,
    // director
    // admin
    AdminComponent,
    SidebarComponent,
    AdminProjectsComponent,
    AdminShopComponent,
    AdminSubscribesComponent,
    AdminPartnersComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminProjectCategoriesComponent,
    AdminBakesComponent,
    AdminMainComponent,
    ModeratorLoginComponent,
    AuthCommentEntityComponent,
    AuthQuestionEntityComponent,
    AuthUpdateEntityComponent,
    AuthUserProjectsComponent,
    AuthUserInfromationComponent,
    AuthUserProjectEntityComponent,
    AuthUpdateDetailsComponent,
    AuthNewsEntityComponent,
    AuthNewsCommentComponent,
    SpinnerComponent,
    OrderSubmitFormComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    UserComponent,
    BakeProjectComponent,
    ProjectEditComponent,
    EditUnactiveProjectComponent,
    CreateUpdateComponent,
    CreateCategoryComponent,
    AdminEditUserComponent,
    AdminNewsComponent,
    CreateNewsComponent,
    FilterPipe,
    AddProductToFinishedProjectComponent,
    ProductsComponent,
    EditProductComponent,
    ProductsViewComponent,
    AddPopularComponent,
    CreatePartnerComponent,
    ProjectBakersComponent,
    ProjectsComponent,
    KaspiResultComponent,
  ],
    imports: [
        BrowserModule,
      AgmCoreModule.forRoot({
        apiKey: 'AIzaSyD5eN7n2C1-JjTOixhhBavbFJeAQAo5AyI'
      }),
      GoogleMapsModule,
        AppRoutingModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
        FormsModule,
        RouterModule.forRoot(routes),
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatIconModule,
        MaterialFileInputModule,
        EditorModule,
        OverlayModule,
        MatSnackBarModule,
        SlickCarouselModule,
        MatButtonModule,
        MatDialogModule,
        MatListModule,
        NgbPaginationModule,
        MatProgressSpinnerModule,
        MatBadgeModule,
        MatMenuModule,
        MatCheckboxModule,
        NgxMatIntlTelInputModule,
        SocialLoginModule,
        MatTooltipModule,
        MatExpansionModule,
        MatTabsModule,
        MatButtonToggleModule,
        MatRadioModule,
        MatStepperModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatChipsModule

    ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
