import {Component, Input, OnInit} from '@angular/core';
import {Project} from '../../../../../../models/project/project';
import {Update} from '../../../../../../models/project/update';
import {UpdateService} from '../../../../../../services/project/update.service';
import {UserService} from "../../../../../../services/user/user.service";
import {Product} from "../../../../../../models/product/product";
import {AuthProductDetailsComponent} from "../../../../shop/product-details/auth-product-details.component";
import {CreateUpdateComponent} from "./create-update/create-update.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-update',
  templateUrl: './auth-update.component.html',
  styleUrls: ['./auth-update.component.css']
})
export class AuthUpdateComponent implements OnInit {
  @Input() project: Project;
  updates: Update[] = [];
  delete = true;
  isOwnerOfProject = false;
  constructor(
    private updateService: UpdateService,
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (this.userService.getUser()) {
      this.isOwnerOfProject = this.project.owner.id === this.userService.getUser().id;
    }
    this.updateService.updates$.subscribe(perf => this.updates = perf);
    this.updateService.getUpdateOfProject(this.project.id).subscribe(perf => {
      this.updateService.changeUpdates(perf);
    });
  }
  addUpdate() {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        projectId: this.project.id,
      },
      width: '60%'
    });
  }
  deleteUpdate() {
    this.updateService.removeUpdate(this.delete);
    this.delete = !this.delete;
  }


}
