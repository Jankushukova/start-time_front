import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthNewsDetailsComponent } from './auth-news-details.component';

describe('NewsDetailsComponent', () => {
  let component: AuthNewsDetailsComponent;
  let fixture: ComponentFixture<AuthNewsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthNewsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthNewsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
