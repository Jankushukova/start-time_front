import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectUpdateComponent } from './user-project-update.component';

describe('ProjectUpdateComponent', () => {
  let component: UserProjectUpdateComponent;
  let fixture: ComponentFixture<UserProjectUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
