import { defineStore } from 'pinia';
import type { Usuario } from '@@/types/Usuario';
import type { LoginResponse } from '@@/types/Auth';
import { useUnidadeStore } from '@/stores/unidadeStore';
import AuthService from '@/services/AuthService';

export const useUsuarioStore = defineStore('usuarioStore', {
  state: () => ({
    _user: {} as Partial<Usuario>,
    _token: null as string | null,
  }),
  getters: {
    user: state => state._user,
    token: state => state._token,
  },
  actions: {
    setUsuario(user: Usuario) {
      this._user = user;
    },
    setToken(token: string) {
      this._token = token;
    },
    async login(res: LoginResponse) {
      this.setUsuario(res.user);
      this.setToken(res.access_token);
      const unidadeStore = useUnidadeStore();
      unidadeStore.setUnidade(null);
    },
    // async logout({ forced } = { forced: false }) {
    async logout() {
      await AuthService.logout();
      this._token = null;
      this._user = {};
      return navigateTo('/admin/login');
      // > TODO aqui devera enviar uma requisição para o servidor para invalidar o token @VictorReisCarlota
    },
  },
  persist: true,
});
