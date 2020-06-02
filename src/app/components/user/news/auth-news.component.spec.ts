import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNewsComponent } from './auth-news.component';

describe('NewsComponent', () => {
  let component: AuthNewsComponent;
  let fixture: ComponentFixture<AuthNewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthNewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
