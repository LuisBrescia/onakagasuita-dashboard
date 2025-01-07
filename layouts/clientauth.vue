<script setup>
import { useRoute, useRouter } from 'vue-router';
import AuthService from '@/services/AuthService';
import { useUsuarioStore } from '@/stores/usuarioStore';

const route = useRoute();
const router = useRouter();

const formData = ref({
  email: '',
  senha: '',
  remember_me: false,
});

const validationErrors = ref({});
const generalErrorMessage = ref('');

const handleSubmitLoading = ref(false);

const handleSubmit = async () => {
  const redirectUrl = '/client/home'; 

  handleSubmitLoading.value = true;
  validationErrors.value = {};
  generalErrorMessage.value = '';

  try {
    const res = await AuthService.login(formData.value);
    const usuarioStore = useUsuarioStore();
    usuarioStore.login(res);
    router.push(redirectUrl); 
  } catch (err) {
    if (err.status == 500) {
      generalErrorMessage.value =
        'Sistema indisponível no momento. Tente novamente mais tarde.';
    } else if (err._data.errors) {
      validationErrors.value = err._data.errors;
    } else {
      generalErrorMessage.value = err._data.message;
    }
  } finally {
    handleSubmitLoading.value = false;
  }
};
</script>

<template>
  <div
    class="bg-img-dotted flex flex-col items-center justify-center bg-surface-0 p-20 dark:bg-surface-950"
  >
    <div
      class="bg-img-dotted flex flex-wrap border border-surface-200 bg-surface-100 dark:border-surface-800 dark:bg-surface-900"
    >
      <div
        class="relative max-w-5xl bg-surface-0 bg-opacity-55 p-16 dark:bg-surface-950 dark:bg-opacity-75 xl:w-1/2"
      >
        <NuxtLink to="/painel">
          <div
            class="absolute left-16 top-8 cursor-pointer text-sm font-medium hover:underline"
          >
            <i class="pi pi-arrow-left mr-1 text-xs" />
            Voltar para painéis
          </div>
        </NuxtLink>

        <div>
          <i class="pi pi-heart mb-12 mt-8 text-5xl" />
        </div>

        <div class="mb-4 text-2xl font-medium">
          Bem-vindo ao sistema de reservas
        </div>
        <slot />
      </div>
      <div
        class="w-full max-w-5xl bg-surface-0 p-16 dark:bg-surface-950 xl:w-1/2"
      >
        <div class="mb-8 text-xl font-medium">Login para realizar reserva</div>

        <Message v-if="generalErrorMessage" :severity="'error'" class="mb-4">
          {{ generalErrorMessage }}
        </Message>

        <div class="flex flex-col gap-2">
          <label for="email">Email</label>
          <InputText
            id="email"
            v-model="formData.email"
            type="text"
            :class="[validationErrors?.email ? 'p-invalid' : '']"
          />
          <small id="email-help" class="text-red-600 dark:text-red-300">
            {{ validationErrors.email ? validationErrors.email[0] : '' }}
          </small>
        </div>

        <div class="mt-4 flex flex-col gap-2">
          <label for="senha">Senha</label>
          <Password
            :feedback="false"
            toggle-mask
            :input-class="[
              'w-full',
              validationErrors?.senha ? 'p-invalid' : '',
            ]"
            v-model="formData.senha"
            @keydown.enter="handleSubmit"
          />
          <small id="senha-help" class="text-red-600 dark:text-red-300">
            {{ validationErrors.senha ? validationErrors.senha[0] : '' }}
          </small>
        </div>

        <div class="mt-6 flex items-center justify-between">
          <div class="flex items-center">
            <Checkbox
              id="rememberme1"
              v-model="formData.remember_me"
              :binary="true"
              class="mr-2"
            />
            <label class="text-sm" for="rememberme1">Lembrar de mim</label>
          </div>
          <a
            class="ml-2 cursor-pointer text-right text-sm font-medium text-primary-500 no-underline hover:underline dark:text-primary-400"
          >
            Esqueceu sua senha?
          </a>
        </div>

        <Button
          label="Entrar"
          icon="pi pi-user"
          class="mt-12 w-full"
          @click="handleSubmit"
          :loading="handleSubmitLoading"
        />

        <div
          class="mx-auto mt-8 flex justify-center text-sm text-surface-700 dark:text-surface-0/70"
        >
          Não tem uma conta?
          <NuxtLink
            to="/client/register"
            class="text-primary ml-2 cursor-pointer font-medium text-surface-950 hover:underline dark:text-surface-50"
          >
            Registre-se
          </NuxtLink>
        </div>
      </div>
    </div>
    <div class="absolute right-8 top-8">
      <CommonChangeThemeButton />
    </div>
  </div>
</template>
