import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCommentComponent } from './auth-comment.component';

describe('CommentComponent', () => {
  let component: AuthCommentComponent;
  let fixture: ComponentFixture<AuthCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
