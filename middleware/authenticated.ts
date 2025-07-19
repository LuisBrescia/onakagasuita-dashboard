import { useUsuarioStore } from '@/stores/usuarioStore';

export default defineNuxtRouteMiddleware(() => {
  const usuarioStore = useUsuarioStore();
  try {
    console.log('middleware/authenticated.ts');
    if (!usuarioStore.token) {
      return navigateTo('/admin/login');
    }
  } catch (error) {
    console.log(error);
  }
  // > TODO aqui devera enviar uma requisição para o servidor para validar o token @VictorReisCarlota
});
