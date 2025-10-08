import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class FinanceService {
  constructor(
    private usersService: UsersService,
    private citiesService: CitiesService,
  ) {}

  getFinanceData = async (userId: number) => {
    const user = await this.usersService.findById(userId);
    const city = this.citiesService.findById(user.preferredCityId);

    const balance = 25.5; // mock
    const ekToReal = 1.0; // 1 EK = R$1,00 (mock)

    const materials = {
      pet: 1.0,
      aluminio: 0.5,
      vidro: 0.2,
      papel: 0.25,
      plastico_mole: 0.25,
      papelao: 0.3,
      jornal: 0.3,
      caixa_leite: 0.1,
      ferro: 0.2,
    };
    console.log(`[FINANCE] city: ${user.preferredCityId}`);
    const response = {
      user: {
        userId: user.userId,
        fullName: user.fullName,
        preferredCity: city,
      },
      balance,
      ek_to_real: ekToReal,
      materials,
    };
    console.log(`[FINANCE] response: ${JSON.stringify(response)}`);
    return response;
  };
}
