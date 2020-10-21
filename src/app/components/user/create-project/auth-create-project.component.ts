import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
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
import * as ClassicEditor from '../../../ckeditor/build/ckeditor';
import '../../../ckeditor/build/translations/en-au';
import '../../../ckeditor/build/translations/ru';

// @ts-ignore
import bootbox = require('bootbox');
import {environment} from "../../../../environments/environment.prod";
import {ImageCroppedEvent} from "ngx-image-cropper";



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
  loading = false;
  titleLangs = ['rus' , 'eng', 'kz'];
  descriptionLangs = [];
  contentLangs = [];
  categories: ProjectCategory[] = [];
  images: FormData;
  rewardsList: Gift[] = [];
  categoryControl = new FormControl('', Validators.required);
  translate;
  back = environment.apiUrl;
  public Editor = ClassicEditor;
  config = {
    language: (this.translator.currentLang=='rus')?'ru':'en-au',
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: this.back + '/api/v1/project/create/image',

    }
  }
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
    this.authService.loggedIn(true);
    this.checkUserData();
    this.projectFormInit();
    this.rewardFormInit();
    this.getCategories();
    this.bindLanguage();

    // this.authorized = false;
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );

  }

  checkUserData() {
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
  imageChangedEvent: any = '';
  croppedImage: any = '';


  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
    this.ImageAddedEvent();
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
  ImageAddedEvent() {
    this.images = new FormData();
    const image: ProjectImage = new ProjectImage();
    image.image = this.croppedImage;
    this.images.append('image', image.image);

  }
  addReward() {
      const gift: Gift = this.rewardForm.getRawValue();
      this.rewardsList.push(gift);
      this.rewardForm.reset();
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
    this.loading = true;
    this.projectForm.patchValue({
      category_id: this.categoryControl.value,
      owner_id: this.userService.getUser().id,
      main_language: this.currentLang
    });
    const project: Project = this.projectForm.getRawValue();
    const deadline = new Date(project.deadline);
    project.deadline = deadline.getFullYear() + '-' + (deadline.getMonth() + 1) + '-' + deadline.getDate();
    this.projectService.create(project).subscribe(perf => {
      // assign project id to rewards list
      this.rewardsList = this.rewardsList.map( (gift) => {
        gift.project_id = perf.id;
        return gift;
      });
      this.images.append('project_id', perf.id.toString());

      this.projectService.createProjectImages(this.images).subscribe( perf4 => {
          // creates project rewards
          this.giftService.create(this.rewardsList).subscribe(perf5 => {
            this.translator.get('create.success').subscribe(perf2 => {
              this.loading = false;
              this.openB(perf2);
            });
            this.router.navigate(['/home/projects'], {queryParams: {unactive: 1}});
          }, error1 => {
            this.loading = false;
            this.translator.get('create.error').subscribe(perf2 => {
              this.openB(perf2);
            });
          });
        },
        error1 => {
          this.loading = false;
          this.translator.get('create.error').subscribe(perf2 => {
            this.openB(perf2);
          });
      });
    }, error => {
      this.loading = false;
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
  openB(text) {
    let title;
    this.translator.get('create.no_contact_info_title').subscribe(perf => title = perf);
    bootbox.alert({
      title: title,
      message: text,
    });
  }


}
