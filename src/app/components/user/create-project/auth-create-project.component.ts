import {Component, Injectable, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user/user.service';
import {Router} from '@angular/router';
import {SimpleAuthService} from '../../../services/auth.service';
import {User} from '../../../models/user/user';
import {Project} from '../../../models/project/project';
import {ProjectService} from '../../../services/project/project.service';
import {MatSelectModule} from '@angular/material/select';
import {ProjectCategory} from '../../../models/project/projectCategory';
import {ProjectCategoryService} from '../../../services/project/project-category.service';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {ProjectImage} from '../../../models/project/projectImage';
import {Gift} from '../../../models/project/gift';
import {GiftService} from '../../../services/project/gift.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
// @ts-ignore
import bootbox = require('bootbox');



export const PICK_FORMATS = {
  parse: {dateInput: {month: 'long', year: 'numeric', day: 'numeric'}},
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'long'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

export class PickDateAdapter extends NativeDateAdapter {
  // tslint:disable-next-line:ban-types
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date, 'yyyy-MM-dd', this.locale);
    } else {
      return date.toDateString();
    }
  }
}



@Component({
  selector: 'app-create-project',
  templateUrl: './auth-create-project.component.html',
  styleUrls: ['./auth-create-project.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]

})


export class AuthCreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  rewardForm: FormGroup;
  authorized = true;
  currentLang: string;
  error = false ;
  date: any;
  titleLangs = ['rus' , 'eng', 'kz'];
  descriptionLangs = [];
  contentLangs = [];
  categories: ProjectCategory[] = [];
  images: FormData = new FormData();
  rewardsList: Gift[] = [];
  categoryControl = new FormControl('', Validators.required);
  translate;
  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private projectService: ProjectService,
              private projectCategoryService: ProjectCategoryService,
              // tslint:disable-next-line:variable-name
              private _snackBar: MatSnackBar,
              private giftService: GiftService,
              public translator: TranslateService,
              private authService: SimpleAuthService

  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
    console.log(this.authService.loggedIn(true));
    this.authService.loggedIn(true);
    this.checkUserData();
    this.projectFormInit();
    this.rewardFormInit();
    this.getCategories();
    this.bindLanguage();
    // this.authorized = false;
  }
  checkUserData() {
    console.log(this.userService.getUser().email);
    if (this.userService.getUser().email === '' || this.userService.getUser().email === null) {
        this.show();
        this.router.navigateByUrl('/main');
        }
      }
  bindLanguage() {
    this.currentLang = this.translate.currentLang;
    this.descriptionLangs.push(this.currentLang);
    this.contentLangs.push(this.currentLang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.descriptionLangs = [];
      this.descriptionLangs.push(this.translator.currentLang);
    });
  }
  getCategories() {
    this.projectCategoryService.get().subscribe(perf => {
      this.categories = perf;
    });
  }
  projectFormInit() {
    this.projectForm = this.builder.group({
      title_eng: ['', [Validators.required]],
      title_rus: ['', [Validators.required]],
      title_kz: ['', [Validators.required]],
      description_eng: ['', [Validators.required]],
      description_rus: ['', [Validators.required]],
      description_kz: ['', [Validators.required]],
      content_eng: ['', [Validators.required]],
      content_rus: ['', [Validators.required]],
      content_kz: ['', [Validators.required]],
      main_language: ['', [Validators.required]],
      deadline: ['', Validators.required],
      video: ['', Validators.required],
      goal: ['', Validators.required],
      category_id: ['', Validators.required],
      owner_id: ['', Validators.required],
    });
  }
  rewardFormInit() {
    this.rewardForm = this.builder.group({
      sum: ['', [Validators.required]],
      description: [ '', [Validators.required]]
    });
  }
  ImageAddedEvent(fileInput: Event) {
    // @ts-ignore
    const files = fileInput.target.files;
    for (let i = 0; i < files.length; i++) {
      const image: ProjectImage = new ProjectImage();
      image.image = files[i];
      this.images.append('image' + ( i + 1), image.image);
      console.log(this.images);
    }

  }
  addReward(event) {
    if (event.keyCode === 13) {
      const gift: Gift = this.rewardForm.getRawValue();
      this.rewardsList.push(gift);
      console.log(this.rewardsList);
      this.rewardForm.reset();
    }
  }
  deleteReward(i) {
    this.rewardsList.splice(i, 1);
  }
  addDescription(language) {
    if (!this.descriptionLangs.includes(language)) {
      this.descriptionLangs.push(language);
    }
  }
  removeDescription(i) {
    this.descriptionLangs.splice(i, 1);
  }
  addContent(language) {
    if (!this.contentLangs.includes(language)) {
      this.contentLangs.push(language);
    }
  }
  removeContent(i) {
    this.contentLangs.splice(i, 1);
  }
  onSubmitProjectForm() {
    this.projectForm.patchValue({
      category_id: this.categoryControl.value,
      owner_id: this.userService.getUser().id,
      main_language: this.currentLang
    });
    const project: Project = this.projectForm.getRawValue();
    const deadline = new Date(project.deadline);
    project.deadline = deadline.getFullYear() + '-' + (deadline.getMonth() + 1) + '-' + deadline.getDate();
    console.log(project);

    this.projectService.create(project).subscribe(perf => {
      // assign project id to rewards list
      this.rewardsList = this.rewardsList.map( (gift) => {
        gift.project_id = perf.id;
        return gift;
      });
      this.images.append('project_id', perf.id.toString());

      // tslint:disable-next-line:no-shadowed-variable
      this.projectService.createProjectImages(this.images).subscribe( perf => {
          // creates project rewards
          // tslint:disable-next-line:no-shadowed-variable
          this.giftService.create(this.rewardsList).subscribe(perf => {
            this.translator.get('create.success').subscribe(perf2 => {
              this.openSnackBar(perf2, 'Close', 'style-success');
            });
            this.router.navigate(['/home/projects'], {queryParams: {unactive: 1}});
          }, error1 => {
            this.translator.get('create.error').subscribe(perf2 => {
              this.openSnackBar(perf2, 'Close', 'style-error');
            });
          });
        },
        error1 => {
          this.translator.get('create.error').subscribe(perf2 => {
            this.openSnackBar(perf2, 'Close', 'style-error');
          });        });



    }, error => {
      this.translator.get('create.error').subscribe(perf2 => {
        this.openSnackBar(perf2, 'Close', 'style-error');
      });
    });
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
  async show() {
    let message;
    let title;
    this.translator.get('create.no_contact_info_warning').subscribe(perf => message = perf);
    this.translator.get('create.no_contact_info_title').subscribe(perf => title = perf);
    if (title && message) {
      bootbox.alert({
        title: title,
        message: message,
        size: 'large',
        centerVertical: true,
      });
    }
  }

}
