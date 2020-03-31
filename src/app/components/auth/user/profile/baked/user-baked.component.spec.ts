import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBakedComponent } from './user-baked.component';

describe('BakedComponent', () => {
  let component: UserBakedComponent;
  let fixture: ComponentFixture<UserBakedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBakedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBakedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
