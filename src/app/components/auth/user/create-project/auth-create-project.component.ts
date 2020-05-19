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
import {Gift} from "../../../../models/project/gift";
import {GiftService} from "../../../../services/project/gift.service";



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
  rewardForm: FormGroup;
  error = false ;
  date : any;
  categories: ProjectCategory[] = [];
  images: FormData = new FormData();
  rewardsList:Gift[] = [];
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
              private giftService:GiftService
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

    this.rewardForm = this.builder.group({
      sum:['',[Validators.required]],
      description:['',[Validators.required]]
    })
  }

  fileEvent(fileInput: Event){
    // @ts-ignore
    const files = fileInput.target.files;
    for(var i = 0; i < files.length;i++){
      const image: ProjectImage = new ProjectImage();
      image.image = files[i];
      this.images.append('image'+(i+1), image.image);
      console.log(this.images);
    }

  }
  onSubmit() {
    this.projectForm.patchValue({
      category_id: this.categoryControl.value,
      owner_id: this.userService.getUser().id
    });
    console.log(this.images);
    const project: Project = this.projectForm.getRawValue();
    const deadline = new Date(project.deadline);
    project.deadline = deadline.getFullYear()+'-' + (deadline.getMonth()+1) + '-'+deadline.getDate();

    this.projectService.create(project).subscribe(perf => {

        //assign project id to rewards list
        this.rewardsList = this.rewardsList.map(function (gift) {
          gift.project_id = perf.id;
          return gift;
        })
        this.images.append('project_id', perf.id.toString())
        // for (var pair of this.images.entries()) {
        //   console.log(pair[0]+ ', ' + pair[1]);
        // }

        this.projectService.createProjectImages(this.images).subscribe(perf=>{
            //creates project rewards
            this.giftService.create(this.rewardsList).subscribe(perf=>{
              this.openSnackBar('Project was sent to moderator', 'Close', 'style-success');
              this.router.navigateByUrl('user/profile');

            },error1 => {
              this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');
            })
          },
          error1 => {
            this.openSnackBar('Please fill all fields correctly', 'Close', 'style-error');
        })



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


  addReward(event){
    if (event.keyCode === 13) {
      const gift: Gift = this.rewardForm.getRawValue();
      this.rewardsList.push(gift);
      console.log(this.rewardsList);
      this.rewardForm.reset();
    }
  }
  deleteReward(i){
    this.rewardsList.splice(i,1);
  }


}
