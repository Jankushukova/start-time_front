import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductToFinishedProjectComponent } from './add-product-to-finished-project.component';

describe('AddProductToFinishedProjectComponent', () => {
  let component: AddProductToFinishedProjectComponent;
  let fixture: ComponentFixture<AddProductToFinishedProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductToFinishedProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductToFinishedProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
