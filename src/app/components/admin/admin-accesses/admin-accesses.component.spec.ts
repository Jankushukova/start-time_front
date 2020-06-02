import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccessesComponent } from './admin-accesses.component';

describe('AdminAccessesComponent', () => {
  let component: AdminAccessesComponent;
  let fixture: ComponentFixture<AdminAccessesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAccessesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAccessesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
