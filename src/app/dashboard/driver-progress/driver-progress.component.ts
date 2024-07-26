import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DeliveryState } from '../../../state/delivery.reducer';
import { selectDeliveriesByDriver } from '../../../state/delivery.selectors';
import { Delivery, DeliveryByDriver } from '../../models/delivery.model';

@Component({
  selector: 'app-driver-progress',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './driver-progress.component.html',
  styleUrl: './driver-progress.component.scss',
})
export class DriverProgressComponent {
  deliveries: Delivery[] = [];
  driverStats: DeliveryByDriver[] = [];
  displayedColumns: string[] = ['nome', 'totalEntregas', 'entregasRealizadas'];

  constructor(private store: Store<DeliveryState>) {}

  ngOnInit(): void {
    this.store.select(selectDeliveriesByDriver).subscribe((data) => {
      this.driverStats = data;
    });
  }
}
