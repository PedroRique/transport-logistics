import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTableModule } from '@angular/material/table';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { DistrictProgressComponent } from './district-progress.component';
import { selectDeliveriesByDistrict } from '../../../state/delivery.selectors';
import { DeliveryState } from '../../../state/delivery.reducer';
import { DeliveryByDistrict } from '../../models/delivery.model';

describe('DistrictProgressComponent', () => {
  let component: DistrictProgressComponent;
  let fixture: ComponentFixture<DistrictProgressComponent>;
  let store: MockStore<DeliveryState>;
  const initialState = {
    deliveries: [],
    deliveriesByDistrict: [
      { bairro: 'District A', totalEntregas: 20, entregasRealizadas: 15 },
      { bairro: 'District B', totalEntregas: 25, entregasRealizadas: 20 },
    ],
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DistrictProgressComponent],
      providers: [provideMockStore({ initialState })],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(DistrictProgressComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display district progress on init', () => {
    const mockDistrictStats: DeliveryByDistrict[] = [
      { bairro: 'District A', totalEntregas: 20, entregasRealizadas: 15 },
      { bairro: 'District B', totalEntregas: 25, entregasRealizadas: 20 },
    ];

    store.overrideSelector(selectDeliveriesByDistrict, mockDistrictStats);
    fixture.detectChanges();

    expect(component.districtStats.length).toBe(2);
    expect(component.districtStats[0].bairro).toBe('District A');
    expect(component.districtStats[0].totalEntregas).toBe(20);
    expect(component.districtStats[0].entregasRealizadas).toBe(15);
    expect(component.districtStats[1].bairro).toBe('District B');
    expect(component.districtStats[1].totalEntregas).toBe(25);
    expect(component.districtStats[1].entregasRealizadas).toBe(20);
  });

  it('should render table rows for each district', () => {
    const mockDistrictStats: DeliveryByDistrict[] = [
      { bairro: 'District A', totalEntregas: 20, entregasRealizadas: 15 },
      { bairro: 'District B', totalEntregas: 25, entregasRealizadas: 20 },
    ];

    store.overrideSelector(selectDeliveriesByDistrict, mockDistrictStats);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const rows = compiled.querySelectorAll('mat-row');
    expect(rows.length).toBe(2);
  });
});
