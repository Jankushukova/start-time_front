import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ProjectCategory} from "../../../../models/project/projectCategory";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectCategoryService} from "../../../../services/project/project-category.service";
import {UserService} from "../../../../services/user/user.service";
import {ProjectImage} from "../../../../models/project/projectImage";

@Component({
  selector: 'app-create-partner',
  templateUrl: './create-partner.component.html',
  styleUrls: ['./create-partner.component.css']
})
export class CreatePartnerComponent implements OnInit {
  partnerForm: FormData = new FormData();
  url = '';
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private builder: FormBuilder
  ) { }

  ngOnInit(): void {
  }
  ImageAddedEvent(fileInput: Event) {
    // @ts-ignore
    const files = fileInput.target.files;
    for (let i = 0; i < files.length; i++) {
      this.partnerForm.append('image', files[i]);
    }

  }
  onSubmit() {
    this.partnerForm.append('url', this.url);
    this.userService.createPartner(this.partnerForm).subscribe(perf => {
      let partners = [];
      this.userService.partners$.subscribe(perf2 => partners = perf2);
      partners.push(perf);
      this.userService.changePartners(partners);
    });
  }

}
