import { Component } from '@angular/core';
import { DriverProgressComponent } from './driver-progress/driver-progress.component';
import { FailedDeliveriesComponent } from './failed-deliveries/failed-deliveries.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DriverProgressComponent, FailedDeliveriesComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
