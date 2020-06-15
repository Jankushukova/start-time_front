import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderSubmitFormComponent } from './order-submit-form.component';

describe('OrderSubmitFormComponent', () => {
  let component: OrderSubmitFormComponent;
  let fixture: ComponentFixture<OrderSubmitFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderSubmitFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderSubmitFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
