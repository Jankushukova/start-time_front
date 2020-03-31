import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthShopComponent } from './auth-shop.component';

describe('ShopComponent', () => {
  let component: AuthShopComponent;
  let fixture: ComponentFixture<AuthShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
