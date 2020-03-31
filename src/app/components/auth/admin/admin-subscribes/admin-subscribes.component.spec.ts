import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubscribesComponent } from './admin-subscribes.component';

describe('AdminSubscribesComponent', () => {
  let component: AdminSubscribesComponent;
  let fixture: ComponentFixture<AdminSubscribesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSubscribesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubscribesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
