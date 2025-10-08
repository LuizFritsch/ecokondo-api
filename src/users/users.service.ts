import { Injectable, NotFoundException } from '@nestjs/common';

export enum UserType {
  admin,
  prefeitura,
  usuario,
}

export type Address = {
  street: string;
  number: string;
  neighborhood: string;
  cityId: number;
  postalCode?: string;
  complement?: string;
  latitude?: number;
  longitude?: number;
};

export type User = {
  userId: number;
  username: string;
  password: string;
  email: string;
  fullName: string;
  userType: UserType;
  address: Address;
  preferredCityId: number; // Cidade onde prefere vender o material (FK para cities)
};

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      userId: 1,
      username: 'admin',
      password: '123456',
      email: 'a@a.com',
      fullName: 'Administrador do Sistema',
      userType: UserType.admin,
      address: {
        street: 'Rua das Flores',
        number: '100',
        neighborhood: 'Centro',
        cityId: 1,
        postalCode: '90000-000',
        latitude: -30.0346,
        longitude: -51.2177,
      },
      preferredCityId: 1,
    },
    {
      userId: 2,
      username: 'usuario',
      password: 'usuario123',
      fullName: 'João da Silva',
      email: 'ab@a.com',
      userType: UserType.usuario,
      address: {
        street: 'Av. Brasil',
        number: '200',
        neighborhood: 'Jardins',
        cityId: 2,
        postalCode: '95000-000',
        latitude: -29.1678,
        longitude: -51.179,
      },
      preferredCityId: 2,
    },
    {
      userId: 3,
      username: 'prefa',
      password: 'prefa123',
      email: 'c@a.com',
      fullName: 'Prefeitura da Silva',
      userType: UserType.prefeitura,
      address: {
        street: 'Praça Central',
        number: '1',
        neighborhood: 'Centro',
        cityId: 3,
        postalCode: '96000-000',
        latitude: -31.771,
        longitude: -52.3426,
      },
      preferredCityId: 3,
    },
  ];

  async findOne(username: string) {
    return this.users.find((user) => user.email === username);
  }

  async findById(userId: number) {
    const u = this.users.find((user) => user.userId === userId);
    if (!u) throw new NotFoundException('User not found');
    return u;
  }

  async updatePreferredCity(userId: number, cityId: number) {
    const u = await this.findById(userId);
    u.preferredCityId = cityId;
    return u;
  }
}
