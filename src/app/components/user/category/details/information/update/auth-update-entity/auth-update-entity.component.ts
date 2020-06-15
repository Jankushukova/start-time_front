import {Component, Input, OnInit} from '@angular/core';
import {Update} from '../../../../../../../models/project/update';
import {UpdateService} from "../../../../../../../services/project/update.service";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-auth-update-entity',
  templateUrl: './auth-update-entity.component.html',
  styleUrls: ['./auth-update-entity.component.css']
})
export class AuthUpdateEntityComponent implements OnInit {
  @Input() update: Update;
  deleteUpdate = false;
  translate;
  constructor(
    private updateService: UpdateService,
    private translator: TranslateService
  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
    this.updateService.deleteUpdate$.subscribe(perf => this.deleteUpdate = perf);
  }

  removeUpdate() {
    let updates: Update[] = [];
    this.updateService.updates$.subscribe(perf => updates = perf);
    updates = updates.filter(data => data.id !== this.update.id);
    this.updateService.changeUpdates(updates);
    this.updateService.removeUpdate(false);
    this.updateService.deleteById(this.update.id).subscribe(perf => {
      console.log(perf);
    });
  }
}
