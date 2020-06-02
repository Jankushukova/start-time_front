import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthQuestionEntityComponent } from './auth-question-entity.component';

describe('AuthQuestionEntityComponent', () => {
  let component: AuthQuestionEntityComponent;
  let fixture: ComponentFixture<AuthQuestionEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthQuestionEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthQuestionEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
