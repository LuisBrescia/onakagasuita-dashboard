import type { LoginRequest, LoginResponse } from '@@/types/Auth';

const AuthService = {
  login: async (loginRequest: LoginRequest) => {
    const res = await useApiRequest<LoginResponse>('/auth/login', {
      method: 'POST',
      body: loginRequest,
    });
    return res;
  },
  loginOperador: async (loginRequest: LoginRequest) => {
    const res = await useApiRequest<LoginResponse>('/auth/login/operador', {
      method: 'POST',
      body: loginRequest,
    });
    return res;
  },
  logout: async () => {
    const res = await useApiRequest<LoginResponse>('/auth/logout', {
      method: 'POST',
    });
    return res;
  },
};

export default AuthService;
