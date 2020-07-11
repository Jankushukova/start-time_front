import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectBakersComponent } from './project-bakers.component';

describe('ProjectBakersComponent', () => {
  let component: ProjectBakersComponent;
  let fixture: ComponentFixture<ProjectBakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectBakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectBakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
