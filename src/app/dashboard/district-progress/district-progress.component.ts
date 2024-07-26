import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DeliveryState } from '../../../state/delivery.reducer';
import { selectDeliveriesByDistrict } from '../../../state/delivery.selectors';
import { Delivery, DeliveryByDistrict } from '../../models/delivery.model';

@Component({
  selector: 'app-district-progress',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './district-progress.component.html',
  styleUrl: './district-progress.component.scss',
})
export class DistrictProgressComponent {
  deliveries: Delivery[] = [];
  districtStats: DeliveryByDistrict[] = [];
  displayedColumns: string[] = [
    'bairro',
    'totalEntregas',
    'entregasRealizadas',
  ];

  constructor(private store: Store<DeliveryState>) {}

  ngOnInit(): void {
    this.store.select(selectDeliveriesByDistrict).subscribe((data) => {
      this.districtStats = data;
    });
  }
}
