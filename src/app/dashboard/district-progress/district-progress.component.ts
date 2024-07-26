import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { Delivery } from '../../models/delivery.model';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-district-progress',
  standalone: true,
  imports: [MatTableModule],
  templateUrl: './district-progress.component.html',
  styleUrl: './district-progress.component.scss',
})
export class DistrictProgressComponent {
  deliveries: Delivery[] = [];
  districtStats: {
    bairro: string;
    totalEntregas: number;
    entregasRealizadas: number;
  }[] = [];
  displayedColumns: string[] = [
    'bairro',
    'totalEntregas',
    'entregasRealizadas',
  ];

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe((data) => {
      this.deliveries = data;
      this.processDistrictStats();
    });
  }

  processDistrictStats(): void {
    const districtMap: {
      [key: string]: { totalEntregas: number; entregasRealizadas: number };
    } = {};

    this.deliveries.forEach((delivery) => {
      const districtName = delivery.cliente_destino.bairro;
      if (!districtMap[districtName]) {
        districtMap[districtName] = { totalEntregas: 0, entregasRealizadas: 0 };
      }
      districtMap[districtName].totalEntregas++;
      if (delivery.status_entrega === 'ENTREGUE') {
        districtMap[districtName].entregasRealizadas++;
      }
    });

    this.districtStats = Object.keys(districtMap).map((key) => ({
      bairro: key,
      totalEntregas: districtMap[key].totalEntregas,
      entregasRealizadas: districtMap[key].entregasRealizadas,
    }));
  }
}
