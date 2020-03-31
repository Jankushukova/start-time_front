import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthDescriptionComponent } from './auth-description.component';

describe('DescriptionComponent', () => {
  let component: AuthDescriptionComponent;
  let fixture: ComponentFixture<AuthDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
