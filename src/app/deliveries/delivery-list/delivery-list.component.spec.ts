import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { CommonModule } from '@angular/common';
import { DeliveryListComponent } from './delivery-list.component';
import { selectAllDeliveries } from '../../../state/delivery.selectors';
import { DeliveryState } from '../../../state/delivery.reducer';
import { Delivery, DeliveryStatus } from '../../models/delivery.model';
import { ChangeDetectorRef } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const MOCK_DELIVERIES: Delivery[] = [
  {
    id: '1',
    documento: '01021',
    motorista: { nome: 'Carlos Pereira' },
    cliente_origem: {
      nome: 'Empresa ABC',
      endereco: 'Rua dos Pinheiros, 789',
      bairro: 'Jardins',
      cidade: 'São Paulo',
    },
    cliente_destino: {
      nome: 'Ana Clara',
      endereco: 'Rua Vergueiro, 1234',
      bairro: 'Liberdade',
      cidade: 'São Paulo',
    },
    status_entrega: DeliveryStatus.ENTREGUE,
  },
  {
    id: '2',
    documento: '01022',
    motorista: { nome: 'João Silva' },
    cliente_origem: {
      nome: 'Empresa XYZ',
      endereco: 'Avenida Paulista, 1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
    },
    cliente_destino: {
      nome: 'Pedro Santos',
      endereco: 'Rua Augusta, 1500',
      bairro: 'Consolação',
      cidade: 'São Paulo',
    },
    status_entrega: DeliveryStatus.PENDENTE,
  },
];

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
