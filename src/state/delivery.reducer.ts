import { createReducer, on } from '@ngrx/store';
import {
  loadDeliveries,
  loadDeliveriesSuccess,
  loadDeliveriesFailure,
} from './delivery.actions';
import { Delivery } from '../app/models/delivery.model';

export interface DeliveryState {
  deliveries: Delivery[];
  error: any;
}

export const initialState: DeliveryState = {
  deliveries: [],
  error: null,
};

export const deliveryReducer = createReducer(
  initialState,
  on(loadDeliveries, (state) => ({ ...state, error: null })),
  on(loadDeliveriesSuccess, (state, { deliveries }) => ({
    ...state,
    deliveries,
  })),
  on(loadDeliveriesFailure, (state, { error }) => ({ ...state, error }))
);
