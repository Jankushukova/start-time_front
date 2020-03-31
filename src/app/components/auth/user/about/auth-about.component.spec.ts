import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthAboutComponent } from './auth-about.component';

describe('AboutComponent', () => {
  let component: AuthAboutComponent;
  let fixture: ComponentFixture<AuthAboutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthAboutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthAboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
