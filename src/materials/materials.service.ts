import { Injectable } from '@nestjs/common';

export type MaterialRule = {
  key: string; // chave técnica para o ícone no app
  label: string; // nome exibido
  allowed: boolean; // true = pode; false = não pode
  icon: string; // mesma da key (mantido por clareza)
};

@Injectable()
export class MaterialsService {
  // Você pode mover isso para DB no futuro.
  private readonly allowed: MaterialRule[] = [
    { key: 'pet', label: 'PET', allowed: true, icon: 'pet' },
    { key: 'aluminio', label: 'Alumínio', allowed: true, icon: 'aluminio' },
    {
      key: 'papel_papelao',
      label: 'Papel/Papelão',
      allowed: true,
      icon: 'papel_papelao',
    },
    { key: 'vidro', label: 'Vidro', allowed: true, icon: 'vidro' },
    {
      key: 'plastico_mole',
      label: 'Plástico mole',
      allowed: true,
      icon: 'plastico_mole',
    },
    {
      key: 'oleo_cozinha',
      label: 'Óleo de cozinha',
      allowed: true,
      icon: 'oleo_cozinha',
    },
    { key: 'ferro', label: 'Ferro/Metais', allowed: true, icon: 'ferro' },
  ];

  private readonly denied: MaterialRule[] = [
    { key: 'toner', label: 'Toner', allowed: false, icon: 'toner' },
    { key: 'tecidos', label: 'Tecidos', allowed: false, icon: 'tecidos' },
    { key: 'pneus', label: 'Pneus', allowed: false, icon: 'pneus' },
    {
      key: 'residuos_organicos',
      label: 'Resíduos orgânicos',
      allowed: false,
      icon: 'residuos_organicos',
    },
    {
      key: 'madeira_tratada',
      label: 'Madeira tratada',
      allowed: false,
      icon: 'madeira_tratada',
    },
    {
      key: 'tintas_solventes',
      label: 'Tintas/solventes',
      allowed: false,
      icon: 'tintas_solventes',
    },
    {
      key: 'eletronicos_baterias',
      label: 'Baterias/eletrônicos*',
      allowed: false,
      icon: 'eletronicos_baterias',
    },
  ];

  getAll() {
    return { allowed: this.allowed, denied: this.denied };
  }
}
