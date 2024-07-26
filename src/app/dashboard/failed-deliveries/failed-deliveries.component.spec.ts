import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { FailedDeliveriesComponent } from './failed-deliveries.component';
import { selectFailedDeliveries } from '../../../state/delivery.selectors';
import { DeliveryState } from '../../../state/delivery.reducer';
import { FailedDelivery } from '../../models/delivery.model';

describe('FailedDeliveriesComponent', () => {
  let component: FailedDeliveriesComponent;
  let fixture: ComponentFixture<FailedDeliveriesComponent>;
  let store: MockStore<DeliveryState>;
  const initialState = {
    deliveries: [],
    failedDeliveries: [
      { nome: 'Delivery A', entregasInsucesso: 5 },
      { nome: 'Delivery B', entregasInsucesso: 3 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FailedDeliveriesComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(FailedDeliveriesComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display failed deliveries on init', () => {
    const mockFailedDeliveries: FailedDelivery[] = [
      { nome: 'Delivery A', entregasInsucesso: 5 },
      { nome: 'Delivery B', entregasInsucesso: 3 },
    ];

    store.overrideSelector(selectFailedDeliveries, mockFailedDeliveries);
    fixture.detectChanges();

    expect(component.unsuccessfulDeliveries.length).toBe(2);
    expect(component.unsuccessfulDeliveries[0].nome).toBe('Delivery A');
    expect(component.unsuccessfulDeliveries[0].entregasInsucesso).toBe(5);
    expect(component.unsuccessfulDeliveries[1].nome).toBe('Delivery B');
    expect(component.unsuccessfulDeliveries[1].entregasInsucesso).toBe(3);
  });

  it('should render table rows for each failed delivery', () => {
    const mockFailedDeliveries: FailedDelivery[] = [
      { nome: 'Delivery A', entregasInsucesso: 5 },
      { nome: 'Delivery B', entregasInsucesso: 3 },
    ];

    store.overrideSelector(selectFailedDeliveries, mockFailedDeliveries);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBe(2);
  });
});
