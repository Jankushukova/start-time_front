import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBakersComponent } from './user-bakers.component';

describe('BakersComponent', () => {
  let component: UserBakersComponent;
  let fixture: ComponentFixture<UserBakersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBakersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
