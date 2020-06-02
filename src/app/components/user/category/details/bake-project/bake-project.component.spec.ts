import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BakeProjectComponent } from './bake-project.component';

describe('BakeProjectComponent', () => {
  let component: BakeProjectComponent;
  let fixture: ComponentFixture<BakeProjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BakeProjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BakeProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
