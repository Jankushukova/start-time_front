import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectDetailsComponent } from './user-project-details.component';

describe('ProjectDetailsComponent', () => {
  let component: UserProjectDetailsComponent;
  let fixture: ComponentFixture<UserProjectDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
