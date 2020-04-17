import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../services/user.service';
import {Router} from '@angular/router';
import {AuthService} from '../../../../services/auth.service';
import {User} from '../../../../models/user';
import {Project} from '../../../../models/project';
import {ProjectService} from '../../../../services/project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './auth-create-project.component.html',
  styleUrls: ['./auth-create-project.component.css']
})
export class AuthCreateProjectComponent implements OnInit {
  projectForm: FormGroup;
  answer: string;
  constructor(private userService: UserService,
              private router: Router,
              private builder: FormBuilder,
              private projectService: ProjectService) { }

  ngOnInit(): void {
    this.projectForm = this.builder.group({
      title: ['', [Validators.required]],
      description: ['', Validators.required],
      deadline: ['', Validators.required],
      content: ['', Validators.required],
      video: ['', Validators.required],
      goal: ['', Validators.required],
      gathered: ['', Validators.required],
      active: ['', Validators.required],
      category_id: ['', Validators.required],
      owner_id: ['', Validators.required],
    });
  }
  onSubmit() {
    const project: Project = this.projectForm.getRawValue();
    // console.log(this.userService.login(user));
    this.projectService.create(project).subscribe(perf => {
        console.log('success');
      }, error => {
      if (error.status === 401) {
        console.log(error);
        this.answer = error.error.error;
      }
    });
  }


}
