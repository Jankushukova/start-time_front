import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthUserInformationComponent } from './unauth-user-information.component';

describe('UnauthUserInformationComponent', () => {
  let component: UnauthUserInformationComponent;
  let fixture: ComponentFixture<UnauthUserInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnauthUserInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnauthUserInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
