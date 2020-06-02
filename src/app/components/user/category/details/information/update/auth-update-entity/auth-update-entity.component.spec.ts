import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthUpdateEntityComponent } from './auth-update-entity.component';

describe('AuthUpdateEntityComponent', () => {
  let component: AuthUpdateEntityComponent;
  let fixture: ComponentFixture<AuthUpdateEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthUpdateEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthUpdateEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
