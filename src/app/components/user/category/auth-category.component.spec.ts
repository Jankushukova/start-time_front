import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCategoryComponent } from './auth-category.component';

describe('CategoryComponent', () => {
  let component: AuthCategoryComponent;
  let fixture: ComponentFixture<AuthCategoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCategoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
