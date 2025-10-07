import { Injectable } from '@nestjs/common';

@Injectable()
export class StatisticsService {
  getStatistics() {
    // Total reciclado por material (em kg)
    const recycled = [
      { name: 'latinha', quantity: 10.5 },
      { name: 'papelao', quantity: 4.0 },
      { name: 'pet', quantity: 6.2 },
      { name: 'oleo de cozinha', quantity: 3.0 },
      { name: 'caixa de leite', quantity: 20.0 },
    ];

    // Histórico de vendas compostas
    const salesHistory = [
      {
        id: 1,
        date: '2025-10-07T12:00:00Z',
        materials: [
          { name: 'latinha', quantity: 2.0, ek_received: 8.0 },
          { name: 'papelao', quantity: 1.0, ek_received: 0.3 },
          { name: 'oleo', quantity: 1.0, ek_received: 2 },
        ],
        total_ek: 10.3,
      },
      {
        id: 2,
        date: '2025-10-05T09:45:00Z',
        materials: [
          { name: 'pet', quantity: 3.0, ek_received: 3.0 },
          { name: 'oleo_cozinha', quantity: 1.0, ek_received: 0.25 },
        ],
        total_ek: 3.25,
      },
    ];
    const response = { recycled, sales_history: salesHistory };
    console.log('[statistics] response: ' + JSON.stringify(response));
    return response;
  }
}
