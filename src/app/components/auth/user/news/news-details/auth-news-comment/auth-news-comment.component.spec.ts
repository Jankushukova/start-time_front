import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNewsCommentComponent } from './auth-news-comment.component';

describe('AuthNewsCommentComponent', () => {
  let component: AuthNewsCommentComponent;
  let fixture: ComponentFixture<AuthNewsCommentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthNewsCommentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNewsCommentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
