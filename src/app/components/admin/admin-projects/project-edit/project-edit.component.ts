import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Project} from '../../../../models/project/project';
import {ProjectService} from '../../../../services/project/project.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import '@ckeditor/ckeditor5-build-classic/build/translations/el';
import '@ckeditor/ckeditor5-build-classic/build/translations/ru';

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
import {environment} from "../../../../../environments/environment.prod";



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
  categories: ProjectCategory[] = [];
  images: FormData = new FormData();
  categoryControl: FormControl;
  project: Project;
  titleLangs = ['rus' , 'eng', 'kz'];
  descriptionLang = [];
  contentLangs = [];
  back = environment.apiUrl;
  loading = false;
  public Editor = ClassicEditor;
  config =
      {
        toolbar: ['selectAll', 'undo', 'redo', 'bold', 'italic', 'blockQuote', 'ckfinder', 'imageTextAlternative',  'heading', 'imageStyle:full', 'imageStyle:side', 'indent', 'outdent', 'link', 'numberedList', 'bulletedList', 'mediaEmbed', 'insertTable', 'tableColumn', 'tableRow', 'mergeTableCells'  ],
        language: 'ru',
        ckfinder: {
          options: {
            resourceType: 'Images'
          },
          uploadUrl:  this.back +  '/ckfinder/connector'
        }
      }

  constructor(
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
  }

  ngOnInit(): void {
    if(!this.userService.getUser() && !this.userService.isAdmin()){
      this.router.navigateByUrl('/main');
    }

    this.authService.loggedIn(true);
    this.projectService.findById(parseInt(this.route.snapshot.paramMap.get('id'))).subscribe(perf => {
      this.project = perf;
      this.bindOldProjectValues();
      this.rewardFormInit();
      this.getCategories();
      this.projectFormInit();
    });
  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
        editor.ui.view.toolbar.element,
        editor.ui.getEditableElement()
    );

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
    this.loading = true;
    this.projectForm.patchValue({
      category_id: this.categoryControl.value,
      owner_id: this.project.owner_id,
      main_language: this.project.main_language
    });
    const project: Project = this.projectForm.getRawValue();
    const deadline = new Date(project.deadline);
    project.deadline = deadline.getFullYear() + '-' + (deadline.getMonth() + 1) + '-' + deadline.getDate();
    this.changeOldProject(project);
    this.projectService.update(this.project.id, project).subscribe(perf1 => {
      this.images.append('project_id', this.project.id.toString());
      this.project.gifts.map(data => data.project_id = this.project.id);
      this.projectService.createProjectImages(this.images).subscribe( perf2 => {
          this.giftService.update(this.project.gifts).subscribe(perf3 => {
            this.addChangedProjectToList();
            this.loading = false;
            this.router.navigateByUrl('/admin/projects');
            this.openSnackBar('Projects successfully changed', 'Close', 'style-success');
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
  changeOldProject(project) {
    this.project.title_kz = project.title_kz;
    this.project.title_rus = project.title_rus;
    this.project.title_eng = project.title_eng;
    this.project.content_rus = project.content_rus;
    this.project.content_kz = project.content_kz;
    this.project.content_eng = project.content_eng;
    this.project.description_kz = project.description_kz;
    this.project.description_rus = project.description_rus;
    this.project.description_eng = project.description_eng;
    this.project.deadline = project.deadline;
    this.project.video = project.video;
    this.project.goal = project.goal;
    this.project.category_id = project.category_id;
  }
  addChangedProjectToList() {
    let projects: Project[] = [];
    this.projectService.projects$.subscribe(perf => projects = perf);
    projects = projects.map(data => {
      if (data.id === this.project.id) {
        data = this.project;
      }
      return data;
    });
    this.projectService.changeProjects(projects);
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }

}
