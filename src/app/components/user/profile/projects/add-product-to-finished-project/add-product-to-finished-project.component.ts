import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../../../models/project/project";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectService} from "../../../../../services/project/project.service";
import {TranslateService} from "@ngx-translate/core";
import {UpdateService} from "../../../../../services/project/update.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProjectImage} from "../../../../../models/project/projectImage";
import {Update} from "../../../../../models/project/update";
import {UpdateImage} from "../../../../../models/project/updateImage";
import {ProductImage} from "../../../../../models/product/productImage";
import {Product} from "../../../../../models/product/product";
import {ProductService} from "../../../../../services/product/product.service";

@Component({
  selector: 'app-add-product-to-finished-project',
  templateUrl: './add-product-to-finished-project.component.html',
  styleUrls: ['./add-product-to-finished-project.component.css']
})
export class AddProductToFinishedProjectComponent implements OnInit {
  productForm: FormGroup;
  project: Project;
  titleLangs = [];
  descriptionLangs = [];
  currentLang = '';
  images: FormData = new FormData();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private projectService: ProjectService,
    private translate: TranslateService,
    private builder: FormBuilder,
    private productService: ProductService,
    // tslint:disable-next-line:variable-name
    private _snackBar: MatSnackBar,
    private translator: TranslateService
  ) {
  }

  ngOnInit(): void {
    this.initProductForm();
    this.bindLangs();
    this.projectService.findById(this.data.projectId).subscribe(perf => {
      console.log(perf);
      this.project = perf;
      this.productForm.patchValue({
        project_id: this.project.id,
        owner_id: this.project.owner_id
      });
    });
  }

  initProductForm() {
    this.productForm = this.builder.group({
      project_id: ['', [Validators.required]],
      owner_id: ['', [Validators.required]],
      title_eng: ['', [Validators.required]],
      title_rus: ['', [Validators.required]],
      title_kz: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    });
  }
  bindLangs() {
    this.currentLang = this.translate.currentLang;
    this.descriptionLangs.push(this.currentLang);
    this.productForm.addControl('description_' + this.currentLang, this.builder.control('', Validators.required));
  }
  addDescription(language) {
    console.log(language);
    if (!this.descriptionLangs.includes(language)) {
      this.productForm.addControl('description_' + language, this.builder.control('', Validators.required));
      this.descriptionLangs.push(language);

    }
  }
  removeDescription(i) {
    this.productForm.removeControl('description_' + this.descriptionLangs[i]);
    this.descriptionLangs.splice(i, 1);
  }

  ImageAddedEvent(fileInput: Event) {
    // @ts-ignore
    const files = fileInput.target.files;
    for (let i = 0; i < files.length; i++) {
      const image: ProductImage = new ProductImage();
      image.url = files[i];
      this.images.append('image' + ( i + 1), image.url);
      console.log(this.images);
    }

  }
  onSubmitProductForm() {

    const product: Product = this.productForm.getRawValue();
    console.log(product);
    this.productService.create(product).subscribe((perf: any) => {
      console.log(perf);
      this.images.append('product_id', perf.id);
      this.productService.createProductImages(this.images).subscribe((res: any) => {
        console.log(res);
        console.log(product.images);
        this.translator.get('project.product.created_success').subscribe(perf2 => {
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
