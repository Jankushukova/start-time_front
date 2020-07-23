import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBakedComponent } from './home-baked.component';

describe('HomeBakedComponent', () => {
  let component: HomeBakedComponent;
  let fixture: ComponentFixture<HomeBakedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBakedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBakedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
