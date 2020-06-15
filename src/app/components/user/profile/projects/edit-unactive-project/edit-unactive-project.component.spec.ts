import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUnactiveProjectComponent } from './edit-unactive-project.component';

describe('EditUnactiveProjectComponent', () => {
  let component: EditUnactiveProjectComponent;
  let fixture: ComponentFixture<EditUnactiveProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUnactiveProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUnactiveProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
