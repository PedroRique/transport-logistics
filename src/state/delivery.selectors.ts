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

export const selectFailedDeliveries = createSelector(
  selectAllDeliveries,
  (deliveries: Delivery[]) => {
    const driverMap: { [key: string]: number } = {};

    deliveries.forEach((delivery) => {
      const driverName = delivery.motorista.nome;
      if (delivery.status_entrega === 'INSUCESSO') {
        if (!driverMap[driverName]) {
          driverMap[driverName] = 0;
        }
        driverMap[driverName]++;
      }
    });

    return Object.keys(driverMap).map((key) => ({
      nome: key,
      entregasInsucesso: driverMap[key],
    })) as FailedDelivery[];
  }
);

export const selectDeliveriesByDriver = createSelector(
  selectAllDeliveries,
  (deliveries: Delivery[]) => {
    const deliveriesByDriver: { [key: string]: DeliveryByDriver } =
      deliveries.reduce((acc, delivery) => {
        const nome = delivery.motorista.nome;

        if (!acc[nome]) {
          acc[nome] = {
            nome: nome,
            totalEntregas: 0,
            entregasRealizadas: 0,
          };
        }

        acc[nome].totalEntregas++;
        if (delivery.status_entrega === 'ENTREGUE') {
          acc[nome].entregasRealizadas++;
        }

        return acc;
      }, {} as { [key: string]: DeliveryByDriver });

    return Object.values(deliveriesByDriver);
  }
);

export const selectDeliveriesByDistrict = createSelector(
  selectAllDeliveries,
  (deliveries: Delivery[]) => {
    const deliveriesByDistrict: { [key: string]: DeliveryByDistrict } =
      deliveries.reduce((acc, delivery) => {
        const bairro = delivery.cliente_destino.bairro;

        if (!acc[bairro]) {
          acc[bairro] = {
            bairro: bairro,
            totalEntregas: 0,
            entregasRealizadas: 0,
          };
        }

        acc[bairro].totalEntregas++;
        if (delivery.status_entrega === 'ENTREGUE') {
          acc[bairro].entregasRealizadas++;
        }

        return acc;
      }, {} as { [key: string]: DeliveryByDistrict });

    return Object.values(deliveriesByDistrict);
  }
);
