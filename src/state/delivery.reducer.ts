import { createReducer, on } from '@ngrx/store';
import {
  loadDeliveries,
  loadDeliveriesSuccess,
  loadDeliveriesFailure,
} from './delivery.actions';
import {
  Delivery,
  DeliveryByDistrict,
  DeliveryByDriver,
  FailedDelivery,
} from '../app/models/delivery.model';

export interface DeliveryState {
  deliveries: Delivery[];
  failedDeliveries: FailedDelivery[];
  deliveriesByDriver: DeliveryByDriver[];
  deliveriesByDistrict: DeliveryByDistrict[];
  error: any;
}

export const initialState: DeliveryState = {
  deliveries: [],
  failedDeliveries: [],
  deliveriesByDriver: [],
  deliveriesByDistrict: [],
  error: null,
};

export const deliveryReducer = createReducer(
  initialState,
  on(loadDeliveries, (state) => ({ ...state, error: null })),
  on(loadDeliveriesSuccess, (state, { deliveries }) => ({
    ...state,
    deliveries,
    failedDeliveries: processFailedDeliveries(deliveries),
    deliveriesByDriver: processDeliveriesByDriver(deliveries),
    deliveriesByDistrict: processDeliveriesByDistrict(deliveries),
  })),
  on(loadDeliveriesFailure, (state, { error }) => ({ ...state, error }))
);

function processFailedDeliveries(deliveries: Delivery[]): FailedDelivery[] {
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

function processDeliveriesByDriver(deliveries: Delivery[]): DeliveryByDriver[] {
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

function processDeliveriesByDistrict(
  deliveries: Delivery[]
): DeliveryByDistrict[] {
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
