import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectCommentComponent } from './user-project-comment.component';

describe('ProjectCommentComponent', () => {
  let component: UserProjectCommentComponent;
  let fixture: ComponentFixture<UserProjectCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
