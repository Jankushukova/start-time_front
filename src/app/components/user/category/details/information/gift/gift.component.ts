import {Component, Input, OnInit} from '@angular/core';
import {Project} from "../../../../../../models/project/project";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-gift',
  templateUrl: './gift.component.html',
  styleUrls: ['./gift.component.css']
})
export class GiftComponent implements OnInit {
  @Input() project: Project;
  translate;

  constructor(
    private translator: TranslateService

  ) { }

  ngOnInit(): void {
    this.translate = this.translator;
  }
  inLocale(sum) {
    return parseInt(sum, 10).toLocaleString();
  }

}
