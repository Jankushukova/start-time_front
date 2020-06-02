import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthCreateProjectComponent } from './auth-create-project.component';

describe('CreateProjectComponent', () => {
  let component: AuthCreateProjectComponent;
  let fixture: ComponentFixture<AuthCreateProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthCreateProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthCreateProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
