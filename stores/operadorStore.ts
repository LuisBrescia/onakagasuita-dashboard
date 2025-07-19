import { defineStore } from 'pinia';
import type { Usuario } from '@/types/Usuario';
import type { LoginOperadorResponse } from '@/types/Auth';
import { useUnidadeStore } from '@/stores/unidadeStore';

export const useOperadorStore = defineStore('operadorStore', {
  state: () => ({
    _user: {} as Usuario | {},
    _token: null as string | null,
  }),
  getters: {
    token: (state) => state._token,
    user: (state) => state._user,
  },
  actions: {
    setToken(token: string) {
      this._token = token;
    },
    setUsuario(user: Usuario) {
      this._user = user;
    },
    async login(res: LoginOperadorResponse) {
      this.setUsuario(res.user);
      this.setToken(res.access_token);
      const unidadeStore = useUnidadeStore();
      unidadeStore.setUnidade(res.unidade);
    },
    async logout({ forced } = { forced: false }) {
      this._token = null;
      this._user = {};

      return navigateTo('/login');
      // > TODO aqui devera enviar uma requisição para o servidor para invalidar o token @VictorReisCarlota
    },
  },
  persist: true,
});
