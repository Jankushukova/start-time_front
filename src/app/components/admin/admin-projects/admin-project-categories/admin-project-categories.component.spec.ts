import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProjectCategoriesComponent } from './admin-project-categories.component';

describe('AdminProjectCategoriesComponent', () => {
  let component: AdminProjectCategoriesComponent;
  let fixture: ComponentFixture<AdminProjectCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminProjectCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProjectCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
