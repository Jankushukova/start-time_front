import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthInformationComponent } from './auth-information.component';

describe('InformationComponent', () => {
  let component: AuthInformationComponent;
  let fixture: ComponentFixture<AuthInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
