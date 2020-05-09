import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../models/user/user';
import {Project} from '../../../../models/project/project';
import {ProjectService} from '../../../../services/project/project.service';
import {MatSelectModule} from '@angular/material/select';
import {ProjectCategory} from '../../../../models/project/projectCategory';
import {ProjectCategoryService} from '../../../../services/project/project-category.service';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
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

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    if (displayFormat === 'input') {
      return formatDate(date,'yyyy-MM-dd',this.locale);;
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
  error = false ;
  date : any;
  categories: ProjectCategory[] = [];
  images: ProjectImage[] = [];
  categoryControl = new FormControl('', Validators.required);
  private configSucces: MatSnackBarConfig = {
    panelClass: ['style-succes'],
  };

  private configError: MatSnackBarConfig = {
    panelClass: ['style-error'],
  };
  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private projectService: ProjectService,
              private projectCategoryService: ProjectCategoryService,
              private _snackBar: MatSnackBar,
              ){ }

  ngOnInit(): void {
    this.projectForm = this.builder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      content: ['', Validators.required],
      video: ['', Validators.required],
      goal: ['', Validators.required],
      category_id: ['', Validators.required],
      owner_id: ['', Validators.required],
    });

    this.projectCategoryService.get().subscribe(perf => {
      this.categories = perf;
    });
  }

  fileEvent(fileInput: Event){
    // @ts-ignore
    const files = fileInput.target.files;
    for(var i = 0; i < files.length;i++){
      const image: ProjectImage = new ProjectImage();
      image.image = "../../../../../assets/images/"+files[i].name;
      this.images.push(image);
    }

  }
  onSubmit() {
    this.projectForm.patchValue({
      category_id: this.categoryControl.value,
      owner_id: this.userService.getUser().id
    });
    const project: Project = this.projectForm.getRawValue();
    const deadline = new Date(project.deadline);
    project.deadline = deadline.getFullYear()+'-' + (deadline.getMonth()+1) + '-'+deadline.getDate();

    this.projectService.create(project).subscribe(perf => {
        this.images = this.images.map(function(image) {
          // @ts-ignore
          image.project_id = perf.id;
          return image;
        });

        this.projectService.createProjectImages(this.images).subscribe(perf=>{
          this.openSnackBar('Project was sent to moderator', 'Close', 'style-success');
        },
          error1 => {
            this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');
          }
          )

        this.router.navigateByUrl('user/profile');
      }, error => {
      this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');

    });
  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition:'right',
    });
  }


}
