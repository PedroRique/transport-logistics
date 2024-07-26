import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailedDeliveriesComponent } from './failed-deliveries.component';
import { provideMockStore } from '@ngrx/store/testing';

describe('FailedDeliveriesComponent', () => {
  let component: FailedDeliveriesComponent;
  let fixture: ComponentFixture<FailedDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedDeliveriesComponent],
      providers: [provideMockStore()],
    }).compileComponents();

    fixture = TestBed.createComponent(FailedDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
