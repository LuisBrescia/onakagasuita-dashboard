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

const handleFormSubmitLoading = ref(false);
const handleFormSubmit = async () => {
  handleFormSubmitLoading.value = true;
  try {
    await createOperador(formData.value);
  } finally {
    handleFormSubmitLoading.value = false;
  }
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
  <div class="page-content">
    <TheTopbar>
      <template #actions>
        <Button
          label="Voltar"
          @click="navigateTo('/admin/home/operadores')"
          size="small"
          outlined
          icon="pi pi-arrow-left"
          severity="secondary"
        />

        <Button
          severity="success"
          size="small"
          icon="pi pi-save"
          label="Salvar"
          :loading="handleFormSubmitLoading"
          @click="handleFormSubmit"
        />
      </template>
    </TheTopbar>
    <main class="page-inner container mx-auto flex h-full flex-col p-4">
      <span class="my-8 text-center">
        <div class="text-2xl">Novo operador</div>
        <p class="text-base text-surface-600 dark:text-surface-400">
          Obrigatório para acessar o painel operacional.
        </p>
      </span>

      <div
        class="rounded border border-surface-300 bg-surface-0 px-4 py-8 text-sm dark:border-surface-700 dark:bg-surface-900"
      >
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
                  outline:
                    formData.icon === 'desktop' ? '2px solid #FFC239' : '',
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
                  outline:
                    formData.icon === 'laptop' ? '2px solid #FFC239' : '',
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
  </div>
</template>
