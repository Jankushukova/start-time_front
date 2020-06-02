import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Project} from '../../../../models/project/project';
import {ProjectService} from '../../../../services/project/project.service';

// @ts-ignore
import bootbox = require('bootbox');
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectCategory} from '../../../../models/project/projectCategory';
import {Gift} from '../../../../models/project/gift';
import {UserService} from '../../../../services/user/user.service';
import {ProjectCategoryService} from '../../../../services/project/project-category.service';
import {GiftService} from '../../../../services/project/gift.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SimpleAuthService} from '../../../../services/auth.service';
import {ProjectImage} from '../../../../models/project/projectImage';



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
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class ProjectEditComponent implements OnInit {
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
  project: Project;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private route: ActivatedRoute,
    private projectService: ProjectService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private router: Router,
    private builder: FormBuilder,
    private projectCategoryService: ProjectCategoryService,
    private giftService: GiftService,
    public translate: TranslateService,
    private authService: SimpleAuthService
  ) {
    console.log(data.projectId);
  }

  ngOnInit(): void {
    this.authService.loggedIn(true);
    this.projectService.findById(this.data.projectId).subscribe(perf => {
      this.project = perf;
      this.checkUserData();
      this.projectFormInit();
      this.rewardFormInit();
      this.getCategories();
      this.bindLanguage();
    });
  }

  checkUserData() {
    if (this.userService.getUser().email === null || this.userService.getUser().phone_number === null
      || (this.userService.getUser().email === null && this.userService.getUser().phone_number === null )) {
      this.show();
      this.router.navigateByUrl('/main');
    }
  }
  bindLanguage() {
    this.currentLang = this.translate.currentLang;
    console.log(this.translate.currentLang);
    this.descriptionLangs.push(this.currentLang);
    this.contentLangs.push(this.currentLang);
    this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    });
  }
  getCategories() {
    this.projectCategoryService.get().subscribe(perf => {
      this.categories = perf;
    });
  }
  projectFormInit() {
    this.projectForm = this.builder.group({
      title_eng: [(this.project.title_eng) ? this.project.title_eng : '', [Validators.required]],
      title_rus: [(this.project.title_rus) ? this.project.title_rus : '', [Validators.required]],
      title_kz: [(this.project.title_kz) ? this.project.title_kz : '', [Validators.required]],
      description_eng: [(this.project.description_eng) ? this.project.description_eng : '', [Validators.required]],
      description_rus: [(this.project.description_rus) ? this.project.description_rus : '', [Validators.required]],
      description_kz: [(this.project.description_kz) ? this.project.description_kz : '', [Validators.required]],
      content_eng: [(this.project.content_eng) ? this.project.content_eng : '', [Validators.required]],
      content_rus: [(this.project.content_rus) ? this.project.content_rus : '', [Validators.required]],
      content_kz: [(this.project.content_kz) ? this.project.content_kz : '', [Validators.required]],
      main_language: [(this.project.main_language) ? this.project.main_language : '', [Validators.required]],
      deadline: [(this.project.deadline) ? this.project.deadline : '', Validators.required],
      video: [(this.project.video) ? this.project.video : '', Validators.required],
      goal: [(this.project.goal) ? this.project.goal : '', Validators.required],
      category_id: [(this.project.category_id) ? this.project.category_id : '', Validators.required],
      owner_id: [(this.project.owner_id) ? this.project.owner_id : '', Validators.required],
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
            this.openSnackBar('Project was sent to moderator', 'Close', 'style-success');
            this.router.navigateByUrl('user/profile');
          }, error1 => {
            this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');
          });
        },
        error1 => {
          this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');
        });



    }, error => {
      this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');

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
    bootbox.alert({
      title: 'Baking gifts',
      message: 'Your contact information isn\'t complete! To create your project, please, provide both email and phone_number',
      size: 'large',
      centerVertical: true,
    });
  }

}
