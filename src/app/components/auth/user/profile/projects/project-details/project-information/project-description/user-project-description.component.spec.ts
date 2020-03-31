import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectDescriptionComponent } from './user-project-description.component';

describe('ProjectDescriptionComponent', () => {
  let component: UserProjectDescriptionComponent;
  let fixture: ComponentFixture<UserProjectDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
