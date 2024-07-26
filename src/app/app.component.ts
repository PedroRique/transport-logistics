import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { DeliveryService } from './services/delivery.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'transport-logistics';

  constructor(private deliveryService: DeliveryService) {
    this.deliveryService.getDeliveries().subscribe((data) => {
      console.log(data);
    });
  }
}
