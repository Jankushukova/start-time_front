import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeratorLoginComponent } from './moderator-login.component';

describe('ModeratorLoginComponent', () => {
  let component: ModeratorLoginComponent;
  let fixture: ComponentFixture<ModeratorLoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModeratorLoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModeratorLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
