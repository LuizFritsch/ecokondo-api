import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class StatisticsService {
  constructor(
    private usersService: UsersService,
    private citiesService: CitiesService,
  ) {}

  async getStatistics(userId: number) {
    const user = await this.usersService.findById(userId);
    const saleCity = this.citiesService.findById(user.preferredCityId);
    console.log(`[STATISTICS] ${user.preferredCityId}`);
    const recycled = {
      total_kg: 125.4,
      total_ek: 122.3,
      by_material: [
        { name: 'pet', kg: 55.8, ek: 55.8 },
        { name: 'aluminio', kg: 12.1, ek: 6.0 },
        { name: 'papel', kg: 8.2, ek: 2.05 },
      ],
      most_active_neighborhoods: [
        { name: user.address.neighborhood, contributions: 14 },
      ],
    };

    const salesHistory = [
      {
        id: 1,
        date: '2025-10-06T10:00:00Z',
        city: saleCity,
        materials: [
          { name: 'pet', quantity: 5.0, ek_received: 5.0 },
          { name: 'aluminio', quantity: 2.0, ek_received: 1.0 },
        ],
        total_ek: 6.0,
      },
      {
        id: 2,
        date: '2025-10-05T09:45:00Z',
        city: saleCity,
        materials: [
          { name: 'pet', quantity: 3.0, ek_received: 3.0 },
          { name: 'oleo_cozinha', quantity: 1.0, ek_received: 0.25 },
        ],
        total_ek: 3.25,
      },
    ];
    const response = {
      user: { userId: user.userId, fullName: user.fullName },
      recycled,
      sales_history: salesHistory,
    };

    console.log(`[STATISTICS] response: ${JSON.stringify(response)}`);
    return response;
  }
}
