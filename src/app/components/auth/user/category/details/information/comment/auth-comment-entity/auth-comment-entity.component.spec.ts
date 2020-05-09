import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCommentEntityComponent } from './auth-comment-entity.component';

describe('AuthCommentEntityComponent', () => {
  let component: AuthCommentEntityComponent;
  let fixture: ComponentFixture<AuthCommentEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCommentEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCommentEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
