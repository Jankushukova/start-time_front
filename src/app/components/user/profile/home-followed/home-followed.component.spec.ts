import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFollowedComponent } from './home-followed.component';

describe('HomeFollowedComponent', () => {
  let component: HomeFollowedComponent;
  let fixture: ComponentFixture<HomeFollowedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFollowedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFollowedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
