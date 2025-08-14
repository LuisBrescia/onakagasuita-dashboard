import type { Cliente } from '@@/types/Cliente';

export type ReservaRequest = {
  salao_id: number;
  horario_selecionado: string;
  cliente: Partial<Cliente>;
  unidade_id: number;
  num_mesas: number;
};
