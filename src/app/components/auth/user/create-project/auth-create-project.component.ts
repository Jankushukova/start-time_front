import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../models/user';
import {Project} from '../../../../models/project';
import {ProjectService} from '../../../../services/project.service';
import {MatSelectModule} from '@angular/material/select';
import {ProjectCategory} from '../../../../models/projectCategory';
import {ProjectCategoryService} from '../../../../services/project-category.service';
import {DateAdapter, MAT_DATE_FORMATS, NativeDateAdapter} from '@angular/material/core';
import {formatDate} from '@angular/common';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import {OverlayModule} from '@angular/cdk/overlay';



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
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class AuthCreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  imageForm: FormGroup;
  error = false ;
  date : any;
  categories: ProjectCategory[] = [];
  categoryControl = new FormControl('', Validators.required);
  imageControl = new FormControl('', Validators.required);
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
    this.imageForm = this.builder.group({
      project_id: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
    this.projectCategoryService.get().subscribe(perf => {
      this.categories = perf;
    });
  }
  onSubmit() {
    this.projectForm.patchValue({
      category_id: this.categoryControl.value,
      owner_id: this.userService.getUser().id
    });
    const project: Project = this.projectForm.getRawValue();
    this.projectService.create(project).subscribe(perf => {
      console.log(perf);
        this.openSnackBar('Project was sent to moderator', 'Close', 'style-success');
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
