import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeliveryState } from './delivery.reducer';

export const selectDeliveryState =
  createFeatureSelector<DeliveryState>('deliveries');

export const selectAllDeliveries = createSelector(
  selectDeliveryState,
  (state: DeliveryState) => state.deliveries
);

export const selectFailedDeliveries = createSelector(
  selectDeliveryState,
  (state: DeliveryState) => state.failedDeliveries
);

export const selectDeliveriesByDriver = createSelector(
  selectDeliveryState,
  (state: DeliveryState) => state.deliveriesByDriver
);

export const selectDeliveriesByDistrict = createSelector(
  selectDeliveryState,
  (state: DeliveryState) => state.deliveriesByDistrict
);
