<script setup lang="ts">
import { useToast } from 'primevue/usetoast';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import OperadorService from '@/services/OperadorService';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const breadcrumbStore = useBreadcrumbStore();
const unidadeStore = useUnidadeStore();
const toast = useToast();
const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';
breadcrumbStore.setBreadcrumb([
  { name: unidadeNome, to: '/admin/home' },
  { name: 'Operadores', to: '/admin/home/operadores' },
  { name: 'Adicionar', to: '/admin/home/operadores/adicionar' },
]);

const formData = ref({
  login: '',
  label: '',
  senha: '',
  icon: '',
});

const handleFormSubmit = async () => {
  await createOperador(formData.value);
};

const createOperador = async (operadorRequest: any) => {
  try {
    await OperadorService.create(operadorRequest);
    toast.add({
      severity: 'success',
      summary: 'Operador criado com sucesso',
      life: 3000,
    });
    navigateTo('/admin/home/operadores');
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: error._data.message,
      life: 3000,
    });
  }
};

const updateSalao = async (id: number, operadorRequest: any) => {
  try {
    await OperadorService.update(id, operadorRequest);
    toast.add({
      severity: 'success',
      summary: 'Salão atualizado com sucesso',
      life: 3000,
    });
    navigateTo('/admin/home/estrutura');
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao atualizar salão',
      life: 3000,
    });
  }
};
</script>

<template>
  <main class="container mx-auto flex h-full flex-col p-4">
    <h6
      class="mb-4 inline-flex cursor-pointer dark:text-surface-400 dark:hover:text-surface-100"
      @click="navigateTo('/admin/home/operadores')"
    >
      <IconArrowLeft class="mr-1" :size="20" />
      <span class="text-sm">Voltar</span>
    </h6>

    <div
      class="relative flex-1 rounded border border-surface-300 bg-surface-0 p-4 text-sm dark:border-surface-700 dark:bg-surface-900"
    >
      <Button
        label="Adicionar"
        size="small"
        icon="pi pi-plus"
        class="absolute right-4 top-4"
        @click="handleFormSubmit"
      />

      <div class="text-2xl">Novo operador</div>
      <p class="text-base text-surface-600 dark:text-surface-400">
        Obrigatório para acessar o painel operacional.
      </p>

      <Divider class="my-4" />

      <div class="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2">
        <!--* Login -->
        <div class="flex flex-col gap-2">
          <label for="login">Login</label>
          <InputText
            id="login"
            v-model="formData.login"
            aria-describedby="login-help"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">Senha</label>
          <Password
            :feedback="false"
            toggle-mask
            :input-class="['w-full']"
            v-model="formData.senha"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">Descrição</label>
          <Textarea
            id="label"
            rows="5"
            cols="30"
            v-model="formData.label"
            aria-describedby="label-help"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label for="login">Ícone</label>

          <div class="flex gap-3">
            <div
              class="interativo cursor-pointer rounded-sm border border-surface-300 bg-surface-0 p-4 dark:border-surface-700 dark:bg-surface-900"
              :style="{
                outline: formData.icon === 'desktop' ? '2px solid #FFC239' : '',
              }"
              @click="formData.icon = 'desktop'"
            >
              <IconMonitor />
            </div>
            <div
              class="interativo cursor-pointer rounded-sm border border-surface-300 bg-surface-0 p-4 dark:border-surface-700 dark:bg-surface-900"
              :style="{
                outline: formData.icon === 'user' ? '2px solid #FFC239' : '',
              }"
              @click="formData.icon = 'user'"
            >
              <IconUserRound />
            </div>
            <div
              class="interativo cursor-pointer rounded-sm border border-surface-300 bg-surface-0 p-4 dark:border-surface-700 dark:bg-surface-900"
              :style="{
                outline:
                  formData.icon === 'smartphone' ? '2px solid #FFC239' : '',
              }"
              @click="formData.icon = 'smartphone'"
            >
              <IconSmartphone />
            </div>
            <div
              class="interativo cursor-pointer rounded-sm border border-surface-300 bg-surface-0 p-4 dark:border-surface-700 dark:bg-surface-900"
              :style="{
                outline: formData.icon === 'laptop' ? '2px solid #FFC239' : '',
              }"
              @click="formData.icon = 'laptop'"
            >
              <IconLaptop />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
