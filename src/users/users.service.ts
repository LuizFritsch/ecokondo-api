import { Injectable } from '@nestjs/common';

export enum UserType {
  admin,
  prefeitura,
  usuario,
}

export type User = {
  userId: number;
  username: string;
  password: string;
  fullName: string;
  userType: UserType;
};

@Injectable()
export class UsersService {
  private readonly users: Array<User> = [
    {
      userId: 1,
      username: 'a@a.com',
      fullName: 'Luiz Frito',
      password: '123456',
      userType: UserType.admin,
    },
    {
      userId: 2,
      username: 'maria',
      fullName: 'Maria Silva',
      password: 'guess',
      userType: UserType.usuario,
    },
    {
      userId: 3,
      username: 'prefa',
      password: 'prefa123',
      fullName: 'Prefeitura da Silva',
      userType: UserType.usuario,
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find((user) => user.username === username);
  }
}
