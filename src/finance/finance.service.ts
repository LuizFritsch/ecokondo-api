import { Injectable } from '@nestjs/common';

@Injectable()
export class FinanceService {
  getFinanceData() {
    // Mock de dados — pode futuramente buscar do banco
    const balance = 120; // saldo do usuário
    const ekToReal = 2.0; // cotação atual da moeda

    // Tabela de materiais (kg → EcoKondos)
    const materials = {
      latinha: 4.0,
      pet: 1.0,
      bombona_plastica: 1.0,
      oleo_cozinha: 0.25, // 4kg = 1 EK
      papel: 0.25, // 4kg = 1 EK
      plastico_mole: 0.25, // 4kg = 1 EK
      papelao: 0.3,
      jornal: 0.3,
      caixa_leite: 0.1, // 10kg = 1 EK
      ferro: 0.2,
    };

    return {
      balance,
      ek_to_real: ekToReal,
      materials,
    };
  }
}
