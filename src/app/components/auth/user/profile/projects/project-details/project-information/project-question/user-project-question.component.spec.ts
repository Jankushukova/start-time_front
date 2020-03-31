import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectQuestionComponent } from './user-project-question.component';

describe('ProjectQuestionComponent', () => {
  let component: UserProjectQuestionComponent;
  let fixture: ComponentFixture<UserProjectQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
