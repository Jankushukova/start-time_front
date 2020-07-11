import {Component, Inject, OnInit} from '@angular/core';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ProjectCategory} from '../../../../../models/project/projectCategory';
import {Gift} from '../../../../../models/project/gift';
import {Project} from '../../../../../models/project/project';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {ProjectService} from '../../../../../services/project/project.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {UserService} from '../../../../../services/user/user.service';
import {ProjectCategoryService} from '../../../../../services/project/project-category.service';
import {GiftService} from '../../../../../services/project/gift.service';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {SimpleAuthService} from '../../../../../services/auth.service';
import {ProjectImage} from '../../../../../models/project/projectImage';
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
  selector: 'app-edit-unactive-project',
  templateUrl: './edit-unactive-project.component.html',
  styleUrls: ['./edit-unactive-project.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class EditUnactiveProjectComponent implements OnInit {
  projectForm: FormGroup;
  rewardForm: FormGroup;
  authorized = true;
  currentLang: string;
  error = false ;
  date: any;
  categories: ProjectCategory[] = [];
  images: FormData = new FormData();
  categoryControl: FormControl;
  project: Project;
  titleLangs = ['rus' , 'eng', 'kz'];
  descriptionLang = [];
  contentLangs = [];
  translate;
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
    public translator: TranslateService,
    private authService: SimpleAuthService
  ) {
  }

  ngOnInit(): void {
    this.translate = this.translator;
    this.authService.loggedIn(true);
    this.projectService.findById(this.data.projectId).subscribe(perf => {
      this.project = perf;
      this.bindOldProjectValues();
      this.rewardFormInit();
      this.getCategories();
      this.projectFormInit();
    });
  }
  bindOldProjectValues() {
    for (let i = 0; i < this.project.images.length; i++) {
      this.images.append('image' + ( i + 1), this.project.images[i].image);
    }

    this.categoryControl = new FormControl(this.project.category_id, Validators.required);
    if (this.project.description_eng) {
      this.descriptionLang.push('eng');
    }
    if (this.project.description_rus) {
      this.descriptionLang.push('rus');
    }
    if (this.project.description_kz) {
      this.descriptionLang.push('kz');
    }
    if (this.project.content_kz) {
      this.contentLangs.push('kz');
    }
    if (this.project.content_eng) {
      this.contentLangs.push('eng');
    }
    if (this.project.content_rus) {
      this.contentLangs.push('rus');
    }
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
      deadline: [(this.project.deadline) ? new Date(this.project.deadline) : '', Validators.required],
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
      this.images.append('image' + ( i + 1 + this.project.images.length), image.image);
    }

  }
  addReward(event) {
    if (event.keyCode === 13) {
      const gift: Gift = this.rewardForm.getRawValue();
      this.project.gifts.push(gift);
      this.rewardForm.reset();
    }
  }
  deleteReward(i) {
    this.project.gifts.splice(i, 1);
  }
  addDescription(language) {
    if (!this.descriptionLang.includes(language)) {
      this.descriptionLang.push(language);
    }
  }
  removeDescription(i) {
    this.descriptionLang.splice(i, 1);
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
      owner_id: this.project.owner_id,
      main_language: this.project.main_language
    });
    const project: Project = this.projectForm.getRawValue();
    const deadline = new Date(project.deadline);
    project.deadline = deadline.getFullYear() + '-' + (deadline.getMonth() + 1) + '-' + deadline.getDate();

    this.projectService.update(this.project.id, project).subscribe(perf1 => {
      this.images.append('project_id', this.project.id.toString());
      this.project.gifts.map(data => data.project_id = this.project.id);
      this.projectService.createProjectImages(this.images).subscribe( perf2 => {
        this.giftService.update(this.project.gifts).subscribe(perf3 => {
          this.translator.get('create.success').subscribe(perf => {
            this.openSnackBar(perf, 'Close', 'style-success');
          });
          }, error1 => {
          this.translator.get('create.error').subscribe(perf => {
            this.openSnackBar(perf, 'Close', 'style-error');
          });
          });
        },
        error1 => {
          this.translator.get('create.error').subscribe(perf => {
            this.openSnackBar(perf, 'Close', 'style-error');
          });        });

    }, error => {
      this.translator.get('create.error').subscribe(perf => {
        this.openSnackBar(perf, 'Close', 'style-error');
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

}
