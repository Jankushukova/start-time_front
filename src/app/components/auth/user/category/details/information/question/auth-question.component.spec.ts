import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthQuestionComponent } from './auth-question.component';

describe('QuestionComponent', () => {
  let component: AuthQuestionComponent;
  let fixture: ComponentFixture<AuthQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
