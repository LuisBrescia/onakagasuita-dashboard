import type { LoginRequest, LoginResponse } from '@/types/Auth';

const AuthService = {
  login: async (loginRequest: LoginRequest) => {
    const res = await useApiRequest<LoginResponse>('/login', {
      method: 'POST',
      body: loginRequest,
    });
    return res;
  },
  loginOperador: async (loginRequest: LoginRequest) => {
    const res = await useApiRequest<LoginResponse>('/operador/login', {
      method: 'POST',
      body: loginRequest,
    });
    return res;
  },
  logout: async () => {
    // > TODO @VictorReisCarlota
  },
};

export default AuthService;
