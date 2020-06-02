import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNewsEntityComponent } from './auth-news-entity.component';

describe('AuthNewsEntityComponent', () => {
  let component: AuthNewsEntityComponent;
  let fixture: ComponentFixture<AuthNewsEntityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthNewsEntityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNewsEntityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
