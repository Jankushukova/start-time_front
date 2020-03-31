import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProjectBakersComponent } from './user-project-bakers.component';

describe('ProjectBakersComponent', () => {
  let component: UserProjectBakersComponent;
  let fixture: ComponentFixture<UserProjectBakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProjectBakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProjectBakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
