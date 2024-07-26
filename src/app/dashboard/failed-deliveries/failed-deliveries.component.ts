import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { DeliveryState } from '../../../state/delivery.reducer';
import { selectFailedDeliveries } from '../../../state/delivery.selectors';
import { Delivery, FailedDelivery } from '../../models/delivery.model';

@Component({
  selector: 'app-failed-deliveries',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './failed-deliveries.component.html',
  styleUrl: './failed-deliveries.component.scss',
})
export class FailedDeliveriesComponent {
  deliveries: Delivery[] = [];
  unsuccessfulDeliveries: FailedDelivery[] = [];
  displayedColumns: string[] = ['nome', 'entregasInsucesso'];

  constructor(private store: Store<DeliveryState>) {}

  ngOnInit(): void {
    this.store.select(selectFailedDeliveries).subscribe((data) => {
      this.unsuccessfulDeliveries = data;
    });
  }
}
