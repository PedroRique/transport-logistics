import { Component } from '@angular/core';
import { Delivery } from '../../models/delivery.model';
import { DeliveryService } from '../../services/delivery.service';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-driver-progress',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './driver-progress.component.html',
  styleUrl: './driver-progress.component.scss',
})
export class DriverProgressComponent {
  deliveries: Delivery[] = [];
  driverStats: {
    nome: string;
    totalEntregas: number;
    entregasRealizadas: number;
  }[] = [];
  displayedColumns: string[] = ['nome', 'totalEntregas', 'entregasRealizadas'];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe((data) => {
      this.deliveries = data;
      this.processDriverStats();
    });
  }

  processDriverStats(): void {
    const driverMap: {
      [key: string]: { totalEntregas: number; entregasRealizadas: number };
    } = {};

    this.deliveries.forEach((delivery) => {
      const driverName = delivery.motorista.nome;
      if (!driverMap[driverName]) {
        driverMap[driverName] = { totalEntregas: 0, entregasRealizadas: 0 };
      }
      driverMap[driverName].totalEntregas++;
      if (delivery.status_entrega === 'ENTREGUE') {
        driverMap[driverName].entregasRealizadas++;
      }
    });

    this.driverStats = Object.keys(driverMap).map((key) => ({
      nome: key,
      totalEntregas: driverMap[key].totalEntregas,
      entregasRealizadas: driverMap[key].entregasRealizadas,
    }));
  }
}
