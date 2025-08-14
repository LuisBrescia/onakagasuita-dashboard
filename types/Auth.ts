import type { Usuario } from '@@/types/Usuario';
import type { Unidade } from '@@/types/Unidade';

export type RegisterRequest = {
  // > TODO
};

export type RegisterResponse = {
  // > TODO
};

export type LoginRequest = {
  email: string;
  senha: string;
  remember_me: boolean;
};

export type LoginResponse = {
  user: Usuario;
  access_token: string;
};

export type LoginOperadorResponse = {
  user: Usuario;
  unidade: Unidade;
  access_token: string;
};
