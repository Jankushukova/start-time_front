import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUpdateComponent } from './auth-update.component';

describe('UpdateComponent', () => {
  let component: AuthUpdateComponent;
  let fixture: ComponentFixture<AuthUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
