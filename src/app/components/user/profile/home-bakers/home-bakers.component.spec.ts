import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeBakersComponent } from './home-bakers.component';

describe('HomeBakersComponent', () => {
  let component: HomeBakersComponent;
  let fixture: ComponentFixture<HomeBakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeBakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeBakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
