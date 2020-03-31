import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectInformationComponent } from './user-project-information.component';

describe('ProjectInformationComponent', () => {
  let component: UserProjectInformationComponent;
  let fixture: ComponentFixture<UserProjectInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
