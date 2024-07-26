import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { DeliveryService } from '../app/services/delivery.service';
import {
  loadDeliveries,
  loadDeliveriesFailure,
  loadDeliveriesSuccess,
} from './delivery.actions';

@Injectable()
export class DeliveryEffects {
  actions$ = inject(Actions);

  loadDeliveries$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDeliveries),
      mergeMap(() =>
        this.deliveryService.getDeliveries().pipe(
          map((deliveries) => loadDeliveriesSuccess({ deliveries })),
          catchError((error) => of(loadDeliveriesFailure({ error })))
        )
      )
    )
  );

  constructor(private deliveryService: DeliveryService) {}
}
