import { Component } from '@angular/core';
import { DeliveryService } from '../../services/delivery.service';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { Delivery } from '../../models/delivery.model';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.scss',
})
export class DeliveryListComponent {
  deliveries: Delivery[] = [];
  filteredDeliveries = new MatTableDataSource<Delivery>();
  selectedDriver: string = '';
  selectedStatus: string = '';
  drivers: string[] = [];
  statuses: string[] = ['ENTREGUE', 'INSUCESSO']; // Ajustar para os status corretos
  displayedColumns: string[] = [
    'documento',
    'motorista',
    'cliente_origem',
    'cliente_destino',
    'status_entrega',
  ];

  pageEvent?: PageEvent;

  constructor(private deliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.deliveryService.getDeliveries().subscribe((data) => {
      this.deliveries = data;
      this.filteredDeliveries.data = this.deliveries;
      this.drivers = [...new Set(data.map((d) => d.motorista.nome))];
    });
  }

  applyFilter() {
    let filteredData = this.deliveries;
    if (this.selectedDriver) {
      filteredData = filteredData.filter(
        (d) => d.motorista.nome === this.selectedDriver
      );
    }
    if (this.selectedStatus) {
      filteredData = filteredData.filter(
        (d) => d.status_entrega === this.selectedStatus
      );
    }
    this.filteredDeliveries.data = filteredData;
  }
}
