import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CitiesService } from '../cities/cities.service';

type MaterialName =
  | 'pet'
  | 'aluminio'
  | 'vidro'
  | 'papel'
  | 'plastico_mole'
  | 'papelao'
  | 'jornal'
  | 'caixa_leite'
  | 'oleo_cozinha'
  | 'ferro';

interface SaleMaterialItem {
  name: MaterialName;
  quantity: number; // em kg (ou litros no caso do óleo, mas tratamos como número)
  ek_received: number;
}

interface Sale {
  id: number;
  date: string; // ISO
  city: {
    id: number;
    name: string;
    state: string;
    latitude: number;
    longitude: number;
  };
  materials: SaleMaterialItem[];
  total_ek: number;
}

interface RecycledByMaterial {
  name: MaterialName;
  kg: number;
  ek?: number;
}

@Injectable()
export class StatisticsService {
  constructor(
    private usersService: UsersService,
    private citiesService: CitiesService,
  ) {}

  /**
   * Tabela de "preço" (EK por kg) para cada material.
   * Mantém coerência com o FinanceService.
   */
  private readonly ekPerKg: Record<MaterialName, number> = {
    pet: 1.0,
    aluminio: 0.5,
    vidro: 0.2,
    papel: 0.25,
    plastico_mole: 0.25,
    papelao: 0.3,
    jornal: 0.3,
    caixa_leite: 0.1,
    oleo_cozinha: 0.25, // 1L ~ 0.25 EK (ajuste de exemplo)
    ferro: 0.2,
  };

  private randomInt(min: number, max: number): number {
    // [min, max], inclusivo
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private randomFloat(min: number, max: number, decimals = 1): number {
    const v = Math.random() * (max - min) + min;
    const p = Math.pow(10, decimals);
    return Math.round(v * p) / p;
  }

  private pickRandomDistinct<T>(arr: readonly T[], n: number): T[] {
    const copy = [...arr];
    const out: T[] = [];
    for (let i = 0; i < n && copy.length > 0; i++) {
      const idx = this.randomInt(0, copy.length - 1);
      out.push(copy[idx]);
      copy.splice(idx, 1);
    }
    return out;
  }

  /**
   * Gera uma venda aleatória para a cidade informada.
   * - Escolhe de 1 a 4 materiais aleatórios.
   * - Quantidades aleatórias coerentes.
   * - Calcula EK recebido por item e total da venda.
   */
  private generateRandomSale(
    id: number,
    city: {
      id: number;
      name: string;
      state: string;
      latitude: number;
      longitude: number;
    },
    baseDate: Date,
  ): Sale {
    const allMaterials = Object.keys(this.ekPerKg) as MaterialName[];
    const materialsCount = this.randomInt(1, 4);
    const chosen = this.pickRandomDistinct(allMaterials, materialsCount);

    const materials: SaleMaterialItem[] = chosen.map((name) => {
      // Quantidade média por material (ajuste leve para parecer mais realista)
      let qtyMin = 1.0;
      let qtyMax = 6.0;

      if (name === 'aluminio') {
        qtyMin = 0.5; // latinhas
        qtyMax = 3.0;
      } else if (name === 'oleo_cozinha') {
        qtyMin = 0.5;
        qtyMax = 2.0;
      } else if (name === 'vidro') {
        qtyMin = 2.0;
        qtyMax = 10.0;
      }

      const quantity = this.randomFloat(qtyMin, qtyMax, 1);
      const ek_received = this.randomFloat(
        quantity * this.ekPerKg[name] * 0.9, // variação leve
        quantity * this.ekPerKg[name] * 1.1,
        2,
      );

      return { name, quantity, ek_received };
    });

    const total_ek = Number(
      materials.reduce((sum, m) => sum + m.ek_received, 0).toFixed(2),
    );

    // Espalha as vendas por alguns minutos
    const date = new Date(baseDate.getTime() - this.randomInt(0, 60) * 60_000);

    return {
      id,
      date: date.toISOString(),
      city,
      materials,
      total_ek,
    };
  }

  /**
   * Agrega as vendas para gerar o bloco "recycled"
   */
  private aggregateRecycled(sales: Sale[]): {
    total_kg: number;
    total_ek: number;
    by_material: RecycledByMaterial[];
  } {
    const byMat = new Map<MaterialName, { kg: number; ek: number }>();

    for (const sale of sales) {
      for (const item of sale.materials) {
        const prev = byMat.get(item.name) ?? { kg: 0, ek: 0 };
        prev.kg += item.quantity;
        prev.ek += item.ek_received;
        byMat.set(item.name, prev);
      }
    }

    const by_material: RecycledByMaterial[] = Array.from(byMat.entries()).map(
      ([name, agg]) => ({
        name,
        kg: Number(agg.kg.toFixed(1)),
        ek: Number(agg.ek.toFixed(2)),
      }),
    );

    const total_kg = Number(
      by_material.reduce((s, m) => s + m.kg, 0).toFixed(1),
    );
    const total_ek = Number(
      by_material.reduce((s, m) => s + (m.ek ?? 0), 0).toFixed(2),
    );

    return { total_kg, total_ek, by_material };
  }

  /**
   * Endpoint service:
   * - Baseado no `preferredCityId` do usuário
   * - Gera um histórico de vendas com materiais aleatórios
   * - Mantém o formato já consumido pelo app Flutter
   */
  async getStatistics(userId: number) {
    const user = await this.usersService.findById(userId);
    const saleCity = this.citiesService.findById(user.preferredCityId);

    // Gera de 2 a 5 vendas recentes, com materiais aleatórios
    const salesCount = this.randomInt(2, 5);
    const now = new Date();
    const sales: Sale[] = [];

    for (let i = 0; i < salesCount; i++) {
      // Espalha as vendas em dias/horas recentes
      const baseDate = new Date(
        now.getTime() - this.randomInt(0, 5) * 24 * 60 * 60_000,
      );
      sales.push(this.generateRandomSale(i + 1, saleCity, baseDate));
    }

    // Ordena por data desc
    sales.sort((a, b) => (a.date < b.date ? 1 : -1));

    const recycled = this.aggregateRecycled(sales);

    return {
      user: { userId: user.userId, fullName: user.fullName },
      recycled,
      sales_history: sales,
    };
  }
}
