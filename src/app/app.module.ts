import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule, Routes} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { UnauthComponent } from './components/unauth/unauth.component';
import { AdminComponent } from './components/auth/admin/admin.component';
import { LoginComponent } from './components/unauth/login/login.component';
import { RegisterComponent } from './components/unauth/register/register.component';
import { MainComponent } from './components/unauth/main/main.component';
import { NewsComponent } from './components/unauth/news/news.component';
import { ContactComponent } from './components/unauth/contact/contact.component';
import { AboutComponent } from './components/unauth/about/about.component';
import { HelpComponent } from './components/unauth/help/help.component';
import { ShopComponent } from './components/unauth/shop/shop.component';
import { UserProfileComponent } from './components/auth/user/profile/user-profile.component';
import { UserProjectsComponent } from './components/auth/user/profile/projects/user-projects.component';
import { CategoryComponent } from './components/unauth/category/category.component';
import { DetailsComponent } from './components/unauth/category/details/details.component';
import { DescriptionComponent } from './components/unauth/category/details/information/description/description.component';
import { CommentComponent } from './components/unauth/category/details/information/comment/comment.component';
import { UpdateComponent } from './components/unauth/category/details/information/update/update.component';
import { QuestionComponent } from './components/unauth/category/details/information/question/question.component';
import { InformationComponent } from './components/unauth/category/details/information/information.component';
import { AuthCreateProjectComponent } from './components/auth/user/create-project/auth-create-project.component';
import { UserBakersComponent } from './components/auth/user/profile/bakers/user-bakers.component';
import { UserBakedComponent } from './components/auth/user/profile/baked/user-baked.component';
import { UserFollowersComponent } from './components/auth/user/profile/followers/user-followers.component';
import { RecommendationComponent } from './components/auth/user/profile/recommendation/recommendation.component';
import { UserProjectLikesComponent } from './components/auth/user/profile/projects/likes/user-project-likes.component';
import { UserProjectViewsComponent } from './components/auth/user/profile/projects/views/user-project-views.component';
import { UserProjectDetailsComponent } from './components/auth/user/profile/projects/project-details/user-project-details.component';
import { UserProjectBakersComponent } from './components/auth/user/profile/projects/project-bakers/user-project-bakers.component';
import { UserProjectInformationComponent } from './components/auth/user/profile/projects/project-details/project-information/user-project-information.component';
import { UserProjectUpdateComponent } from './components/auth/user/profile/projects/project-details/project-information/project-update/user-project-update.component';
import { UserProjectCommentComponent } from './components/auth/user/profile/projects/project-details/project-information/project-comment/user-project-comment.component';
import { UserProjectQuestionComponent } from './components/auth/user/profile/projects/project-details/project-information/project-question/user-project-question.component';
import { UserProjectDescriptionComponent } from './components/auth/user/profile/projects/project-details/project-information/project-description/user-project-description.component';
import { NewsDetailsComponent } from './components/unauth/news/news-details/news-details.component';
import { ProductDetailsComponent } from './components/unauth/shop/product-details/product-details.component';
import {AuthComponent} from './components/auth/user/auth.component';
import {AuthAboutComponent} from './components/auth/user/about/auth-about.component';
import {AuthCategoryComponent} from './components/auth/user/category/auth-category.component';
import {AuthDetailsComponent} from './components/auth/user/category/details/auth-details.component';
import {AuthInformationComponent} from './components/auth/user/category/details/information/auth-information.component';
import {AuthUpdateComponent} from './components/auth/user/category/details/information/update/auth-update.component';
import {AuthQuestionComponent} from './components/auth/user/category/details/information/question/auth-question.component';
import {AuthDescriptionComponent} from './components/auth/user/category/details/information/description/auth-description.component';
import {AuthContactComponent} from './components/auth/user/contact/auth-contact.component';
import {AuthHelpComponent} from './components/auth/user/help/auth-help.component';
import {AuthMainComponent} from './components/auth/user/main/auth-main.component';
import {AuthNewsComponent} from './components/auth/user/news/auth-news.component';
import {AuthNewsDetailsComponent} from './components/auth/user/news/news-details/auth-news-details.component';
import {AuthShopComponent} from './components/auth/user/shop/auth-shop.component';
import {AuthProductDetailsComponent} from './components/auth/user/shop/product-details/auth-product-details.component';
import {AuthCommentComponent} from './components/auth/user/category/details/information/comment/auth-comment.component';
import { DirectorComponent } from './components/auth/director/director.component';
import { ManagerComponent } from './components/auth/manager/manager.component';
import { PartnersComponent } from './components/unauth/partners/partners.component';
import { ProfileComponent } from './components/unauth/profile/profile.component';
import { ProjectsComponent } from './components/unauth/profile/projects/projects.component';
import { AuthPartnersComponent } from './components/auth/user/auth-partners/auth-partners.component';
import {AuthUserProfileComponent} from './components/auth/user/auth-user-profile/auth-user-profile.component';
import {AuthUserProjectsComponent} from './components/auth/user/auth-user-profile/auth-user-projects/auth-user-projects.component';
import { UserInformationComponent } from './components/auth/user/profile/user-information/user-information.component';
import { UnauthUserInformationComponent } from './components/unauth/profile/unauth-user-information/unauth-user-information.component';
import { AuthUserInfromationComponent } from './components/auth/user/auth-user-profile/auth-user-infromation/auth-user-infromation.component';
import { SidebarComponent } from './components/auth/admin/sidebar/sidebar.component';
import { AdminProjectsComponent } from './components/auth/admin/admin-projects/admin-projects.component';
import { AdminShopComponent } from './components/auth/admin/admin-shop/admin-shop.component';
import { AdminSubscribesComponent } from './components/auth/admin/admin-subscribes/admin-subscribes.component';
import { AdminPartnersComponent } from './components/auth/admin/admin-partners/admin-partners.component';
import { AdminFilesComponent } from './components/auth/admin/admin-files/admin-files.component';
import { AdminUsersComponent } from './components/auth/admin/admin-users/admin-users.component';
import { AdminOrdersComponent } from './components/auth/admin/admin-shop/admin-orders/admin-orders.component';
import { AdminProjectCategoriesComponent } from './components/auth/admin/admin-projects/admin-project-categories/admin-project-categories.component';
import { AdminShopCategoriesComponent } from './components/auth/admin/admin-shop/admin-shop-categories/admin-shop-categories.component';
import { AdminBakesComponent } from './components/auth/admin/admin-projects/admin-bakes/admin-bakes.component';
import { AdminMainComponent } from './components/auth/admin/admin-main/admin-main.component';
import { ModeratorLoginComponent } from './components/auth/moderator-login/moderator-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormField} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import {EditorModule} from '@tinymce/tinymce-angular';
import {TokenInterceptor} from './interceptors/token';
import {OverlayModule} from '@angular/cdk/overlay';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

const routes: Routes = [
  {path: 'start', component: UnauthComponent,
    children: [
    {path: '', redirectTo: 'main', pathMatch: 'full'},
    {path: 'main', component: MainComponent},
    {path: 'news', component: NewsComponent},
    {path: 'contact', component: ContactComponent},
    {path: 'help', component: HelpComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'about', component: AboutComponent},
    {path: 'shop', component: ShopComponent},
    {path: 'category', component: CategoryComponent},
    {path: 'productDetail', component: ProductDetailsComponent},
    {path: 'newsDetail', component: NewsDetailsComponent},
    {path: 'partners', component: PartnersComponent},
    {path: 'userProfile', component: ProfileComponent,
      children: [
        {path: '', redirectTo: 'projects', pathMatch: 'full'},
        {path: 'projects', component: ProjectsComponent},
        {path: 'information', component: UnauthUserInformationComponent},
      ]
    },
    {path: 'details', component: DetailsComponent,
      children: [
        {path: '', redirectTo: 'description', pathMatch: 'full'},
        {path: 'description', component: DescriptionComponent},
        {path: 'comments', component: CommentComponent},
        {path: 'updates', component: UpdateComponent},
        {path: 'questions', component: QuestionComponent},
      ]
    },
    ]

  },
  {path: 'user', component: AuthComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: AuthMainComponent},
      {path: 'news', component: AuthNewsComponent},
      {path: 'contact', component: AuthContactComponent},
      {path: 'help', component: AuthHelpComponent},
      {path: 'about', component: AuthAboutComponent},
      {path: 'shop', component: AuthShopComponent},
      {path: 'category', component: AuthCategoryComponent},
      {path: 'project/details', component: AuthDetailsComponent,
        children: [
          {path: '', redirectTo: 'description', pathMatch: 'full'},
          {path: 'description', component: AuthDescriptionComponent},
          {path: 'comments', component: AuthCommentComponent},
          {path: 'updates', component: AuthUpdateComponent},
          {path: 'questions', component: AuthQuestionComponent},
        ]
      },
      {path: 'partners', component: AuthPartnersComponent},
      {path: 'userProfile', component: AuthUserProfileComponent,
        children: [
          {path: '', redirectTo: 'projects', pathMatch: 'full'},
          {path: 'projects', component: AuthUserProjectsComponent},
          {path: 'information', component: AuthUserInfromationComponent},
        ]},
      {path: 'productDetail', component: AuthProductDetailsComponent},
      {path: 'newsDetail', component: AuthNewsDetailsComponent},
      {path: 'create', component: AuthCreateProjectComponent},
      {path: 'profile', component: UserProfileComponent,
        children: [
          {path: '', redirectTo: 'recommendation', pathMatch: 'full'},
          {path: 'recommendation', component: RecommendationComponent},
          {path: 'projects', component: UserProjectsComponent},
          {path: 'bakers', component: UserBakersComponent},
          {path: 'baked', component: UserBakedComponent},
          {path: 'information', component: UserInformationComponent},
          {path: 'followers', component: UserFollowersComponent},
          {path: 'projectDetails', component: UserProjectDetailsComponent,
            children: [
              {path: '', redirectTo: 'description', pathMatch: 'full'},
              {path: 'description', component: UserProjectDescriptionComponent},
              {path: 'comments', component: UserProjectCommentComponent},
              {path: 'updates', component: UserProjectUpdateComponent},
              {path: 'questions', component: UserProjectQuestionComponent},
            ]
          },
          {path: 'projectLikes', component: UserProjectLikesComponent},
          {path: 'projectViews', component: UserProjectViewsComponent},
          {path: 'projectBakers', component: UserProjectBakersComponent},
        ]
      }
    ]
  },
  {path: 'admin', component: AdminComponent,
    children: [
      {path: '', redirectTo: 'main', pathMatch: 'full'},
      {path: 'main', component: AdminMainComponent},
      {path: 'projects', component: AdminProjectsComponent},
      {path: 'shop', component: AdminShopComponent},
      {path: 'subscribes', component: AdminSubscribesComponent},
      {path: 'partners', component: AdminPartnersComponent},
      {path: 'users', component: AdminUsersComponent},
      {path: 'files', component: AdminFilesComponent},
      {path: 'project/bakes', component: AdminBakesComponent},
      {path: 'project/category', component: AdminProjectCategoriesComponent},
      {path: 'shop/orders', component: AdminOrdersComponent},
      {path: 'shop/category', component: AdminShopCategoriesComponent},
    ]
  },
  {path: 'director', component: DirectorComponent},
  {path: 'manager', component: ManagerComponent},
  {path: 'start-time/moderator', component: ModeratorLoginComponent},
  {path: '', redirectTo: 'start', pathMatch: 'full'},

];



@NgModule({
  declarations: [
    AppComponent,
    // unauthorized
    UnauthComponent,
    LoginComponent,
    RegisterComponent,
    MainComponent,
    NewsComponent,
    ContactComponent,
    AboutComponent,
    HelpComponent,
    ShopComponent,
    CategoryComponent,
    DetailsComponent,
    DescriptionComponent,
    CommentComponent,
    UpdateComponent,
    QuestionComponent,
    InformationComponent,
    // authorized
    AuthComponent,
    // user
    AuthAboutComponent,
    AuthCategoryComponent,
    AuthDetailsComponent,
    AuthInformationComponent,
    AuthUpdateComponent,
    AuthQuestionComponent,
    AuthDescriptionComponent,
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
    UserBakersComponent,
    UserBakedComponent,
    UserFollowersComponent,
    RecommendationComponent,
    UserProjectLikesComponent,
    UserProjectViewsComponent,
    UserProjectDetailsComponent,
    UserProjectBakersComponent,
    UserProjectInformationComponent,
    UserProjectUpdateComponent,
    UserProjectCommentComponent,
    UserProjectQuestionComponent,
    UserProjectDescriptionComponent,
    NewsDetailsComponent,
    ProductDetailsComponent,
    PartnersComponent,
    ProfileComponent,
    ProjectsComponent,
    AuthPartnersComponent,
    AuthUserProfileComponent,
    UserInformationComponent,
    UnauthUserInformationComponent,
    AuthUserInfromationComponent,
    // director
    DirectorComponent,
    // manager
    ManagerComponent,
    // admin
    AdminComponent,
    SidebarComponent,
    AdminProjectsComponent,
    AdminShopComponent,
    AdminSubscribesComponent,
    AdminPartnersComponent,
    AdminFilesComponent,
    AdminUsersComponent,
    AdminOrdersComponent,
    AdminProjectCategoriesComponent,
    AdminShopCategoriesComponent,
    AdminBakesComponent,
    AdminMainComponent,
    ModeratorLoginComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
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
        MatSnackBarModule

    ],
  providers: [
    MatDatepickerModule,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],  bootstrap: [AppComponent]
})
export class AppModule { }
