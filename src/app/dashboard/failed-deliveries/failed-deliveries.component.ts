import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-failed-deliveries',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './failed-deliveries.component.html',
  styleUrl: './failed-deliveries.component.scss',
})
export class FailedDeliveriesComponent {
  deliveries: Delivery[] = [];
  unsuccessfulDeliveries: { nome: string; entregasInsucesso: number }[] = [];
  displayedColumns: string[] = ['nome', 'entregasInsucesso'];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe((data) => {
      this.deliveries = data;
      this.processUnsuccessfulDeliveries();
    });
  }

  processUnsuccessfulDeliveries(): void {
    const driverMap: { [key: string]: number } = {};

    this.deliveries.forEach((delivery) => {
      const driverName = delivery.motorista.nome;
      if (delivery.status_entrega === 'INSUCESSO') {
        if (!driverMap[driverName]) {
          driverMap[driverName] = 0;
        }
        driverMap[driverName]++;
      }
    });

    this.unsuccessfulDeliveries = Object.keys(driverMap).map((key) => ({
      nome: key,
      entregasInsucesso: driverMap[key],
    }));
  }
}
