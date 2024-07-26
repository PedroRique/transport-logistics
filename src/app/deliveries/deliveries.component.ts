import { Component } from '@angular/core';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';

@Component({
  selector: 'app-deliveries',
  standalone: true,
  imports: [DeliveryListComponent],
  templateUrl: './deliveries.component.html',
  styleUrl: './deliveries.component.scss',
})
export class DeliveriesComponent {}
