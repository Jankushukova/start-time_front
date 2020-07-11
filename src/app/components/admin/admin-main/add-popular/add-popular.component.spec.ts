import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPopularComponent } from './add-popular.component';

describe('AddPopularComponent', () => {
  let component: AddPopularComponent;
  let fixture: ComponentFixture<AddPopularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPopularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPopularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
