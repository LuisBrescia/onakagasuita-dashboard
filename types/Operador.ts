import type { Usuario } from './Usuario';

export interface Operador extends Usuario {
  login: string;
  senha: string;
  label: string;
  icon: string;
}
