import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../../../../../models/project/project";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectService} from "../../../../../../../services/project/project.service";
import {TranslateService} from "@ngx-translate/core";
import {ProjectImage} from "../../../../../../../models/project/projectImage";
import {Update} from "../../../../../../../models/project/update";
import {UpdateService} from "../../../../../../../services/project/update.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UpdateImage} from "../../../../../../../models/project/updateImage";
import * as ClassicEditor from '../../../../../../../ckeditor/build/ckeditor';
import '../../../../../../../ckeditor/build/translations/en-au';
import '../../../../../../../ckeditor/build/translations/ru';
import {environment} from "../../../../../../../../environments/environment.prod";

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.css']
})
export class CreateUpdateComponent implements OnInit {
  updateForm: FormGroup;
  project: Project;
  titleLangs = [];
  descriptionLangs = [];
  currentLang = '';
  images: FormData = new FormData();
  back = environment.apiUrl;

  public Editor = ClassicEditor;
  config = {
    language: (this.translator.currentLang=='rus')?'ru':'en-au',
    simpleUpload: {
      // The URL that the images are uploaded to.
      uploadUrl: this.back + '/api/v1/project/create/image',

    }
  }
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private translate: TranslateService,
    private builder: FormBuilder,
    private updateService: UpdateService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) {
    projectService.findById(data.projectId).subscribe(perf => {
      this.project = perf;
      this.updateForm.patchValue({
        project_id: this.project.id,
      });
    });
  }

  ngOnInit(): void {
    this.initUpdateForm();
    this.bindLangs();
  }

  initUpdateForm() {
    this.updateForm = this.builder.group({
      project_id: ['', [Validators.required]],
    });
  }
  bindLangs() {
    this.currentLang = this.translate.currentLang;
    this.descriptionLangs.push(this.currentLang);
    this.updateForm.addControl('description_' + this.currentLang, this.builder.control('', Validators.required));
    this.titleLangs.push(this.currentLang);
    this.updateForm.addControl('title_' + this.currentLang, this.builder.control('', Validators.required));
  }
  addDescription(language) {
    if (!this.descriptionLangs.includes(language)) {
      this.updateForm.addControl('description_' + language, this.builder.control('', Validators.required));
      this.descriptionLangs.push(language);

    }
  }
  removeDescription(i) {
    this.updateForm.removeControl('description_' + this.descriptionLangs[i]);
    this.descriptionLangs.splice(i, 1);
  }

  addTitle(language) {
    if (!this.titleLangs.includes(language)) {
      this.updateForm.addControl('title_' + language, this.builder.control('', Validators.required));
      this.titleLangs.push(language);
    }

  }
  removeTitle(i) {
    this.updateForm.removeControl('title_' + this.titleLangs[i]);
    this.titleLangs.splice(i, 1);
  }
  ImageAddedEvent(fileInput: Event) {
    // @ts-ignore
    const files = fileInput.target.files;
    for (let i = 0; i < files.length; i++) {
      const image: ProjectImage = new ProjectImage();
      image.image = files[i];
      this.images.append('image' + ( i + 1), image.image);
    }

  }
  public onReady( editor ) {
    editor.ui.getEditableElement().parentElement.insertBefore(
      editor.ui.view.toolbar.element,
      editor.ui.getEditableElement()
    );

  }
  onSubmitUpdateForm() {

    const update: Update = this.updateForm.getRawValue();
    this.updateService.create(update).subscribe((perf: any) => {
      this.images.append('update_id', perf.id);
      this.updateService.createUpdateImages(this.images).subscribe((res: any) => {
        update.images = res.map(data => new UpdateImage().deserialize(data));
        let updates: Update[] = [];
        this.updateService.updates$.subscribe(perf2 => updates = perf2);
        updates.push(update);
        this.updateService.changeUpdates(updates);
        this.translator.get('project.update.create_success').subscribe(perf2 => {
          this.openSnackBar(perf2, 'Close', 'style-success');
        });

      }, error => {
        this.translator.get('project.update.create_error').subscribe(perf2 => {
          this.openSnackBar(perf2, 'Close', 'style-error');
        });
      });

    }, error => {
      this.translator.get('project.update.create_error').subscribe(perf2 => {
        this.openSnackBar(perf2, 'Close', 'style-error');
      });

    });

  }
  openSnackBar(message: string, action: string, style: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
      panelClass: style,
      horizontalPosition: 'right',
    });
  }
}
