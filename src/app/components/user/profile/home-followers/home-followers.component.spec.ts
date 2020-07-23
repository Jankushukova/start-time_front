import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFollowersComponent } from './home-followers.component';

describe('HomeFollowersComponent', () => {
  let component: HomeFollowersComponent;
  let fixture: ComponentFixture<HomeFollowersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeFollowersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFollowersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
