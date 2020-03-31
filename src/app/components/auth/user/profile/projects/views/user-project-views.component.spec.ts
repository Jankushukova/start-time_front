import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectViewsComponent } from './user-project-views.component';

describe('ViewsComponent', () => {
  let component: UserProjectViewsComponent;
  let fixture: ComponentFixture<UserProjectViewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectViewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectViewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
