import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBakesComponent } from './admin-bakes.component';

describe('AdminBakesComponent', () => {
  let component: AdminBakesComponent;
  let fixture: ComponentFixture<AdminBakesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBakesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBakesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
