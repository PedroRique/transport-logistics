import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadDeliveries } from '../state/delivery.actions';
import { DeliveryState } from '../state/delivery.reducer';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'transport-logistics';

  constructor(private store: Store<DeliveryState>) {}

  ngOnInit() {
    this.store.dispatch(loadDeliveries());
  }
}
