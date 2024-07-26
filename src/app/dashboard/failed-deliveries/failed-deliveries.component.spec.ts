import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDeliveriesComponent } from './failed-deliveries.component';

describe('FailedDeliveriesComponent', () => {
  let component: FailedDeliveriesComponent;
  let fixture: ComponentFixture<FailedDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedDeliveriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FailedDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
