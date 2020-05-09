import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../../models/project';
import {Update} from '../../../../../../../models/update';
import {UpdateService} from '../../../../../../../services/update.service';

@Component({
  selector: 'app-update',
  templateUrl: './auth-update.component.html',
  styleUrls: ['./auth-update.component.css']
})
export class AuthUpdateComponent implements OnInit {
  project:Project;
  updates:Update[] = [];

  constructor(
    private updateService:UpdateService
  ) { }

  ngOnInit(): void {
  }
  someFunction(data){
    this.project = data;
    this.updateService.getUpdateOfProject(this.project.id).subscribe(perf=>{
      this.updates = perf;
    })
    }

}
