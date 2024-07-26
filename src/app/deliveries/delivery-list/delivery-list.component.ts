import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { DeliveryState } from '../../../state/delivery.reducer';
import { selectAllDeliveries } from '../../../state/delivery.selectors';
import { Delivery, DeliveryStatus } from '../../models/delivery.model';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-delivery-list',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './delivery-list.component.html',
  styleUrl: './delivery-list.component.scss',
})
export class DeliveryListComponent implements OnInit, AfterViewInit, OnDestroy {
  deliveries: Delivery[] = [];
  filteredDeliveries = new MatTableDataSource<Delivery>();
  selectedDriver: string = '';
  selectedStatus: string = '';
  drivers: string[] = [];
  statuses: string[] = [
    DeliveryStatus.ENTREGUE,
    DeliveryStatus.PENDENTE,
    DeliveryStatus.INSUCESSO,
  ];
  displayedColumns: string[] = [
    'documento',
    'motorista',
    'cliente_origem',
    'cliente_destino',
    'status_entrega',
  ];
  private subscriptions: Subscription = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private store: Store<DeliveryState>,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.subscriptions.add(
      this.store.select(selectAllDeliveries).subscribe((data) => {
        this.deliveries = data;
        this.filteredDeliveries.data = this.deliveries;
        this.drivers = [...new Set(data.map((d) => d.motorista.nome))];
        this.cdr.detectChanges();
      })
    );
  }

  ngAfterViewInit(): void {
    this.filteredDeliveries.paginator = this.paginator;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
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

  clearFilters() {
    this.selectedDriver = '';
    this.selectedStatus = '';
    this.applyFilter();
  }
}
