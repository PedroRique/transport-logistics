import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  Delivery,
  DeliveryByDistrict,
  DeliveryByDriver,
  FailedDelivery,
} from '../app/models/delivery.model';
import { DeliveryState } from './delivery.reducer';

export const selectDeliveryState =
  createFeatureSelector<DeliveryState>('deliveries');

export const selectAllDeliveries = createSelector(
  selectDeliveryState,
  (state: DeliveryState) => state.deliveries
);

const createDeliveryMap = <T>(
  deliveries: Delivery[],
  keyFn: (delivery: Delivery) => string,
  initValue: T,
  updateFn: (acc: T, delivery: Delivery) => void
): { [key: string]: T } => {
  return deliveries.reduce((acc, delivery) => {
    const key = keyFn(delivery);
    if (!acc[key]) {
      acc[key] = { ...initValue };
    }
    updateFn(acc[key], delivery);
    return acc;
  }, {} as { [key: string]: T });
};

export const selectFailedDeliveries = createSelector(
  selectAllDeliveries,
  (deliveries: Delivery[]) => {
    const driverMap = createDeliveryMap(
      deliveries,
      (delivery) => delivery.motorista.nome,
      { nome: '', entregasInsucesso: 0 } as FailedDelivery,
      (acc, delivery) => {
        acc.nome = delivery.motorista.nome;
        if (delivery.status_entrega === 'INSUCESSO') {
          acc.entregasInsucesso++;
        }
      }
    );

    return Object.values(driverMap);
  }
);

export const selectDeliveriesByDriver = createSelector(
  selectAllDeliveries,
  (deliveries: Delivery[]) => {
    const deliveriesByDriver = createDeliveryMap(
      deliveries,
      (delivery) => delivery.motorista.nome,
      { nome: '', totalEntregas: 0, entregasRealizadas: 0 } as DeliveryByDriver,
      (acc, delivery) => {
        acc.nome = delivery.motorista.nome;
        acc.totalEntregas++;
        if (delivery.status_entrega === 'ENTREGUE') {
          acc.entregasRealizadas++;
        }
      }
    );

    return Object.values(deliveriesByDriver);
  }
);

export const selectDeliveriesByDistrict = createSelector(
  selectAllDeliveries,
  (deliveries: Delivery[]) => {
    const deliveriesByDistrict = createDeliveryMap(
      deliveries,
      (delivery) => delivery.cliente_destino.bairro,
      {
        bairro: '',
        totalEntregas: 0,
        entregasRealizadas: 0,
      } as DeliveryByDistrict,
      (acc, delivery) => {
        acc.bairro = delivery.cliente_destino.bairro;
        acc.totalEntregas++;
        if (delivery.status_entrega === 'ENTREGUE') {
          acc.entregasRealizadas++;
        }
      }
    );

    return Object.values(deliveriesByDistrict);
  }
);
