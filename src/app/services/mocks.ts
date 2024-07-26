import { Delivery, DeliveryStatus } from '../models/delivery.model';

export const MOCK_DELIVERIES: Delivery[] = [
  {
    id: '1',
    documento: '01021',
    motorista: { nome: 'Carlos Pereira' },
    cliente_origem: {
      nome: 'Empresa ABC',
      endereco: 'Rua dos Pinheiros, 789',
      bairro: 'Jardins',
      cidade: 'São Paulo',
    },
    cliente_destino: {
      nome: 'Ana Clara',
      endereco: 'Rua Vergueiro, 1234',
      bairro: 'Liberdade',
      cidade: 'São Paulo',
    },
    status_entrega: DeliveryStatus.ENTREGUE,
  },
  {
    id: '2',
    documento: '01022',
    motorista: { nome: 'João Silva' },
    cliente_origem: {
      nome: 'Empresa XYZ',
      endereco: 'Avenida Paulista, 1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
    },
    cliente_destino: {
      nome: 'Pedro Santos',
      endereco: 'Rua Augusta, 1500',
      bairro: 'Consolação',
      cidade: 'São Paulo',
    },
    status_entrega: DeliveryStatus.PENDENTE,
  },
];
