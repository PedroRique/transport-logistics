import { ChangeDetectorRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DeliveryState } from '../../../state/delivery.reducer';
import { selectAllDeliveries } from '../../../state/delivery.selectors';
import { DeliveryStatus } from '../../models/delivery.model';
import { MOCK_DELIVERIES } from '../../services/mocks';
import { DeliveryListComponent } from './delivery-list.component';

describe('DeliveryListComponent', () => {
  let component: DeliveryListComponent;
  let fixture: ComponentFixture<DeliveryListComponent>;
  let store: MockStore<DeliveryState>;
  let cdr: ChangeDetectorRef;
  const initialState = {
    deliveries: MOCK_DELIVERIES,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeliveryListComponent],
      providers: [
        provideMockStore({ initialState }),
        provideAnimationsAsync(),
        ChangeDetectorRef,
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    cdr = TestBed.inject(ChangeDetectorRef);
    fixture = TestBed.createComponent(DeliveryListComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display deliveries on init', () => {
    store.overrideSelector(selectAllDeliveries, MOCK_DELIVERIES);
    fixture.detectChanges();

    expect(component.deliveries.length).toBe(2);
    expect(component.deliveries[0].documento).toBe('01021');
    expect(component.deliveries[0].motorista.nome).toBe('Carlos Pereira');
    expect(component.deliveries[1].documento).toBe('01022');
    expect(component.deliveries[1].motorista.nome).toBe('João Silva');
  });

  it('should render table rows for each delivery', () => {
    store.overrideSelector(selectAllDeliveries, MOCK_DELIVERIES);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBe(2);
  });

  it('should filter deliveries by driver', () => {
    store.overrideSelector(selectAllDeliveries, MOCK_DELIVERIES);
    component.selectedDriver = 'Carlos Pereira';
    fixture.detectChanges();
    component.applyFilter();
    expect(component.filteredDeliveries.data[0].motorista.nome).toBe(
      'Carlos Pereira'
    );
  });

  it('should filter deliveries by status', () => {
    store.overrideSelector(selectAllDeliveries, MOCK_DELIVERIES);
    component.selectedStatus = DeliveryStatus.ENTREGUE;
    fixture.detectChanges();
    component.applyFilter();
    expect(component.filteredDeliveries.data[0].status_entrega).toBe(
      DeliveryStatus.ENTREGUE
    );
  });

  it('should clear filters', () => {
    store.overrideSelector(selectAllDeliveries, MOCK_DELIVERIES);
    component.selectedDriver = 'Carlos Pereira';
    component.selectedStatus = DeliveryStatus.ENTREGUE;
    fixture.detectChanges();
    component.clearFilters();
    expect(component.selectedDriver).toBe('');
    expect(component.selectedStatus).toBe('');
    expect(component.filteredDeliveries.data.length).toBe(2);
  });
});
