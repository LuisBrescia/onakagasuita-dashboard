import { useOperadorStore } from '@/stores/operadorStore';

export default defineNuxtRouteMiddleware(() => {
  const operadorStore = useOperadorStore();
  try {
    if (!operadorStore.token) {
      return navigateTo('/login');
    }
  } catch (error) {
    console.log(error);
  }
});
