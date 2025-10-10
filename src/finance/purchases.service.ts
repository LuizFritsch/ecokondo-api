import { Injectable } from '@nestjs/common';
import { PurchaseDto } from '../models/purchase.dto';

@Injectable()
export class PurchasesService {
  // 🔹 Mock temporário — substitua por queries no futuro
  private readonly mockPurchases: PurchaseDto[] = [
    {
      id: 1,
      date: new Date('2025-10-10T18:00:00Z'),
      merchant: 'Feira Orgânica Municipal',
      items: [
        { name: 'Tomates', value_ek: 1.2 },
        { name: 'Alface', value_ek: 0.8 },
      ],
      total_ek: 2.0,
    },
    {
      id: 2,
      date: new Date('2025-10-09T12:30:00Z'),
      merchant: 'Feira do agricultor de Tupandi',
      items: [
        { name: 'Alface', value_ek: 3.0 },
        { name: 'Tumate', value_ek: 2.5 },
        { name: 'Beico', value_ek: 2 },
        { name: 'Senora', value_ek: 1.5 },
      ],
      total_ek: 9,
    },
    {
      id: 3,
      date: new Date('2025-10-11T18:00:00Z'),
      merchant: 'Feira Orgânica Municipal',
      items: [
        { name: 'Tomates', value_ek: 1.2 },
        { name: 'Alface', value_ek: 0.8 },
      ],
      total_ek: 2.0,
    },
  ];

  async getUserPurchases(
    userId: number,
  ): Promise<{ userId: number; purchases: PurchaseDto[] }> {
    // 🧠 Aqui, no futuro, você pode filtrar pelo userId se estiver armazenando no banco
    return {
      userId,
      purchases: this.mockPurchases,
    };
  }
}
