import { MOCK_DELIVERIES } from '../app/services/mocks';
import {
  loadDeliveries,
  loadDeliveriesFailure,
  loadDeliveriesSuccess,
} from './delivery.actions';
import { deliveryReducer, initialState } from './delivery.reducer';

describe('DeliveryReducer', () => {
  it('should reset error on loadDeliveries action', () => {
    const action = loadDeliveries();
    const newState = deliveryReducer(initialState, action);

    expect(newState.error).toBeNull();
  });

  it('should update state correctly on loadDeliveriesSuccess action', () => {
    const action = loadDeliveriesSuccess({ deliveries: MOCK_DELIVERIES });
    const newState = deliveryReducer(initialState, action);

    expect(newState.deliveries).toEqual(MOCK_DELIVERIES);
    expect(newState.failedDeliveries).toEqual([
      { nome: 'João Silva', entregasInsucesso: 0 },
      { nome: 'Carlos Pereira', entregasInsucesso: 0 },
    ]);
    expect(newState.deliveriesByDriver).toEqual([
      { nome: 'Carlos Pereira', totalEntregas: 1, entregasRealizadas: 1 },
      { nome: 'João Silva', totalEntregas: 1, entregasRealizadas: 0 },
    ]);
    expect(newState.deliveriesByDistrict).toEqual([
      { bairro: 'Liberdade', totalEntregas: 1, entregasRealizadas: 1 },
      { bairro: 'Consolação', totalEntregas: 1, entregasRealizadas: 0 },
    ]);
  });

  it('should set error on loadDeliveriesFailure action', () => {
    const error = new Error('Something went wrong');
    const action = loadDeliveriesFailure({ error });
    const newState = deliveryReducer(initialState, action);

    expect(newState.error).toBe(error);
  });
});
