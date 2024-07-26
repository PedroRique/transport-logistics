import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DriverProgressComponent } from './driver-progress.component';
import { selectDeliveriesByDriver } from '../../../state/delivery.selectors';
import { DeliveryState } from '../../../state/delivery.reducer';
import { DeliveryByDriver } from '../../models/delivery.model';

describe('DriverProgressComponent', () => {
  let component: DriverProgressComponent;
  let fixture: ComponentFixture<DriverProgressComponent>;
  let store: MockStore<DeliveryState>;
  const initialState = {
    deliveries: [],
    deliveriesByDriver: [
      { nome: 'Driver A', totalEntregas: 10, entregasRealizadas: 8 },
      { nome: 'Driver B', totalEntregas: 15, entregasRealizadas: 12 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriverProgressComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DriverProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display driver progress on init', () => {
    const mockDriverStats: DeliveryByDriver[] = [
      { nome: 'Driver A', totalEntregas: 10, entregasRealizadas: 8 },
      { nome: 'Driver B', totalEntregas: 15, entregasRealizadas: 12 },
    ];

    store.overrideSelector(selectDeliveriesByDriver, mockDriverStats);
    fixture.detectChanges();

    expect(component.driverStats.length).toBe(2);
    expect(component.driverStats[0].nome).toBe('Driver A');
    expect(component.driverStats[0].totalEntregas).toBe(10);
    expect(component.driverStats[0].entregasRealizadas).toBe(8);
    expect(component.driverStats[1].nome).toBe('Driver B');
    expect(component.driverStats[1].totalEntregas).toBe(15);
    expect(component.driverStats[1].entregasRealizadas).toBe(12);
  });

  it('should render table rows for each driver', () => {
    const mockDriverStats: DeliveryByDriver[] = [
      { nome: 'Driver A', totalEntregas: 10, entregasRealizadas: 8 },
      { nome: 'Driver B', totalEntregas: 15, entregasRealizadas: 12 },
    ];

    store.overrideSelector(selectDeliveriesByDriver, mockDriverStats);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBe(2);
  });
});
