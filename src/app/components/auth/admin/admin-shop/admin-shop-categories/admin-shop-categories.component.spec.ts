import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShopCategoriesComponent } from './admin-shop-categories.component';

describe('AdminShopCategoriesComponent', () => {
  let component: AdminShopCategoriesComponent;
  let fixture: ComponentFixture<AdminShopCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminShopCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShopCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
