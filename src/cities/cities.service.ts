import { Injectable, NotFoundException } from '@nestjs/common';

export interface City {
  id: number;
  name: string;
  state: string;
  latitude: number;
  longitude: number;
}

export interface ExchangePoint {
  name: string;
  address: string;
  latitude: number;
  longitude: number;
}

@Injectable()
export class CitiesService {
  private readonly cities: City[] = [
    {
      id: 1,
      name: 'Porto Alegre',
      state: 'RS',
      latitude: -30.0346,
      longitude: -51.2177,
    },
    {
      id: 2,
      name: 'Caxias do Sul',
      state: 'RS',
      latitude: -29.1678,
      longitude: -51.179,
    },
    {
      id: 3,
      name: 'Pelotas',
      state: 'RS',
      latitude: -31.771,
      longitude: -52.3426,
    },
  ];

  findAll(): City[] {
    return this.cities;
  }

  findById(id: number): City {
    const city = this.cities.find((c) => c.id === id);
    if (!city) throw new NotFoundException('City not found');
    return city;
  }

  private readonly exchangePoints: Record<number, ExchangePoint[]> = {
    1: [
      {
        name: 'Eco Ponto Centro',
        address: 'Praça Central, 100',
        latitude: -30.029,
        longitude: -51.22,
      },
      {
        name: 'Associação Recicla Sul',
        address: 'Rua das Flores, 500',
        latitude: -30.04,
        longitude: -51.21,
      },
    ],
    2: [
      {
        name: 'Ponto Verde Jardim América',
        address: 'Av. Brasil, 200',
        latitude: -29.17,
        longitude: -51.18,
      },
      {
        name: 'Coop. Reciclar Serra',
        address: 'Rua dos Lírios, 45',
        latitude: -29.16,
        longitude: -51.175,
      },
    ],
    3: [
      {
        name: 'Eco Estação Centro',
        address: 'Av. Bento, 999',
        latitude: -31.77,
        longitude: -52.345,
      },
    ],
  };

  listExchangePoints(cityId: number): ExchangePoint[] {
    this.findById(cityId); // valida 404 se cidade não existe
    return this.exchangePoints[cityId] ?? [];
  }
}
