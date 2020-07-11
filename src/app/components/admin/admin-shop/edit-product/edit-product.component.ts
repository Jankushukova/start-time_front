import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Project} from "../../../../models/project/project";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ProjectService} from "../../../../services/project/project.service";
import {TranslateService} from "@ngx-translate/core";
import {ProductService} from "../../../../services/product/product.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ProductImage} from "../../../../models/product/productImage";
import {Product} from "../../../../models/product/product";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm: FormGroup;
  product: Product;
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
    this.productService.findById(this.data.productId).subscribe(perf => {
      this.product = new Product().deserialize(perf);
      this.bindOldProjectValues();
    });
  }
  bindOldProjectValues() {
    for (let i = 0; i < this.product.images.length; i++) {
      this.images.append('image' + ( i + 1), this.product.images[i].url);
    }

    if (this.product.description_eng) {
      this.descriptionLangs.push('eng');
    }
    if (this.product.description_rus) {
      this.descriptionLangs.push('rus');
    }
    if (this.product.description_kz) {
      this.descriptionLangs.push('kz');
    }
    this.productForm.patchValue({
      project_id: this.product.project_id,
      owner_id: this.product.owner_id,
      title_eng: this.product.title_eng ,
      title_rus:  this.product.title_rus,
      title_kz: this.product.title_kz ,
      description_eng: (this.product.description_eng) ? this.product.description_eng : '',
      description_rus: (this.product.description_rus) ? this.product.description_rus : '',
      description_kz: (this.product.description_kz) ? this.product.description_kz : '',
      cost: this.product.cost,
    });
  }


  initProductForm() {
    this.productForm = this.builder.group({
      project_id: ['', [Validators.required]],
      owner_id: ['', [Validators.required]],
      title_eng: ['', [Validators.required]],
      title_rus: [ '', [Validators.required]],
      title_kz: ['', [Validators.required]],
      description_eng: ['', [Validators.required]],
      description_rus: ['', [Validators.required]],
      description_kz: ['', [Validators.required]],
      cost: ['', [Validators.required]],
    });
  }
  addDescription(language) {
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
      this.images.append('image' + ( i + 1 + this.product.images.length), image.url);
    }

  }
  onSubmitProductForm() {

    let product: Product = new Product().deserialize(this.productForm.getRawValue());
    this.productService.update(this.product.id, product).subscribe((perf: any) => {
      this.images.append('product_id', perf.id);
      this.productService.createProductImages(this.images).subscribe((res: any) => {
        this.translator.get('project.product.updated_success').subscribe(perf2 => {
          this.openSnackBar(perf2, 'Close', 'style-success');
        });

      }, error => {
        this.translator.get('project.update.create_error').subscribe(perf2 => {
          this.openSnackBar(perf2, 'Close', 'style-error');
        });
      });
      let products: Product[] = [];
      this.productService.products$.subscribe(perf3 => products = perf3);
      product = new Product().deserialize(perf);
      products = products.map(data => {
        if (data.id === this.product.id) {
          product.user = this.product.user;
          data = product;
        }
        return data;
      });
      this.productService.changeProducts(products);
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
