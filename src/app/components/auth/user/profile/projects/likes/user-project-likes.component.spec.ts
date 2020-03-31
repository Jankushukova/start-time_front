import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectLikesComponent } from './user-project-likes.component';

describe('LikesComponent', () => {
  let component: UserProjectLikesComponent;
  let fixture: ComponentFixture<UserProjectLikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectLikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectLikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
