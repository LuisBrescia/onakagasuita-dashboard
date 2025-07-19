<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useToast } from 'primevue/usetoast';
import { useConfirm } from 'primevue/useconfirm';
import SalaoService from '@/services/SalaoService';
import OperadorService from '@/services/OperadorService';
import type { SalaoRequest } from '@/types/Salao';
import { DiasSemana } from '@/enums/DiasSemana';
import { formatarHorario } from '@/utils/formatarHorario';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import { useUnidadeStore } from '@/stores/unidadeStore';
import { useOperadorStore } from '@/stores/operadorStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const route = useRoute();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const breadcrumbStore = useBreadcrumbStore();
const unidadeStore = useUnidadeStore();
const operadorStore = useOperadorStore();

const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';
const originalData = ref<any>({});
const formData = ref<any>({
  login: '',
  label: '',
});
const isEditing = ref({
  login: false,
  senha: false,
  label: false,
  icon: false,
});

const inputNomeRef = ref<HTMLInputElement | null>(null);
const inputLabelRef = ref<HTMLInputElement | null>(null);

const handleEditNome = () => {
  isEditing.value.login = true;
  inputNomeRef.value?.focus();
  inputNomeRef.value?.select();
};

const handleSaveNome = async () => {
  const operadorRequest: any = {
    login: formData.value.login,
  };
  await updateOperador(Number(route.params.id), operadorRequest);
  originalData.value.login = formData.value.login;
  isEditing.value.login = false;
};

const handleCancelNome = () => {
  formData.value.login = originalData.value.login;
  isEditing.value.login = false;
};

const handleEditLabel = () => {
  isEditing.value.label = true;
  inputLabelRef.value?.focus();
  inputLabelRef.value?.select();
};

const handleSaveLabel = async () => {
  const operadorRequest: any = {
    label: formData.value.label,
  };
  await updateOperador(Number(route.params.id), operadorRequest);
  originalData.value.label = formData.value.label;
  isEditing.value.label = false;
};

const handleCancelLabel = () => {
  formData.value.label = originalData.value.label;
  isEditing.value.label = false;
};

const handleEditIcon = () => {
  isEditing.value.icon = true;
};

const handleSaveIcon = async () => {
  const operadorRequest: any = {
    icon: formData.value.icon,
  };
  await updateOperador(Number(route.params.id), operadorRequest);
  originalData.value.icon = formData.value.icon;
  isEditing.value.icon = false;
};

const handleCancelIcon = () => {
  formData.value.icon = originalData.value.icon;
  isEditing.value.icon = false;
};

const getOperador = async () => {
  const operador = await OperadorService.get(Number(route.params.id));
  formData.value = {
    login: operador.login,
    label: operador.label,
    senha: operador.senha,
    icon: operador.icon,
  };

  // Criar uma cópia profunda dos dados originais
  originalData.value = JSON.parse(JSON.stringify(formData.value));
};

const updateOperador = async (id: number, salaoRequest: any) => {
  try {
    await OperadorService.update(id, salaoRequest);
    toast.add({
      severity: 'success',
      summary: 'Operador atualizado com sucesso',
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao atualizar operador',
      life: 3000,
    });
  }
};

const deleteOperador = async () => {
  try {
    await OperadorService.delete(Number(route.params.id));
    toast.add({
      severity: 'success',
      summary: 'Operador apagado com sucesso',
      detail:
        'Caso esteja autenticado, será redirecionado para a página de login.',
      life: 3000,
    });
    router.push('/admin/home/operadores');
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao apagar operador',
      life: 3000,
    });
  }
};

const loginOperador = async () => {
  try {
    const res = await OperadorService.login(Number(route.params.id));
    toast.add({
      severity: 'success',
      summary: 'Operador apagado com sucesso',
      detail:
        'Caso esteja autenticado, será redirecionado para a página de login.',
      life: 3000,
    });
    operadorStore.login(res);
    window.open('/home/', '_blank');
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao apagar operador',
      life: 3000,
    });
  }
};

const confirmDeleteOperador = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Tem certeza que deseja apagar este operador?',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Confirmar',
      severity: 'danger',
    },
    accept: () => {
      deleteOperador();
    },
  });
};

const confirmLoginOperador = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message:
      'Isso encerrará a sessão atual de outras pessoas conectadas ao operador.',
    icon: 'pi pi-exclamation-triangle',
    rejectProps: {
      label: 'Cancelar',
      severity: 'secondary',
      outlined: true,
    },
    acceptProps: {
      label: 'Confirmar',
      severity: 'info',
    },
    accept: () => {
      loginOperador();
    },
  });
};

onBeforeMount(async () => {
  if (!route.params.id) {
    return router.push('/admin/home/operadores');
  }

  await getOperador();
  breadcrumbStore.setBreadcrumb([
    { name: unidadeNome, to: '/admin/home/' },
    { name: 'Operadores', to: '/admin/home/operadores' },
    {
      name: formData.value.login ?? 'Operador',
      to: `/admin/home/operadores/${route.params.id}`,
    },
  ]);
});
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
          severity="info"
          size="small"
          icon="pi pi-sync"
          label="Entrar como operador"
          @click="confirmLoginOperador"
        />

        <Button
          severity="danger"
          size="small"
          icon="pi pi-trash"
          label="Apagar operador"
          @click="confirmDeleteOperador"
        />
      </template>
    </TheTopbar>

    <main class="container mx-auto flex h-full flex-col p-4">
      <span class="my-8 text-center">
        <div class="text-2xl">Gerenciamento de operador</div>
        <p class="text-base text-surface-600 dark:text-surface-400">
          As informações são salvas automaticamente.
        </p>
      </span>

      <div
        class="rounded border border-surface-300 bg-surface-0 px-4 py-4 text-sm dark:border-surface-700 dark:bg-surface-900"
      >
        <!-- Login -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">Login</span>
          <span class="flex-1 text-surface-900 dark:text-surface-0">
            <input
              ref="inputNomeRef"
              v-model="formData.login"
              class="rounded border-none bg-transparent p-1 outline-none"
              :readonly="!isEditing.login"
              :style="{
                outline: isEditing.login ? '1px solid #FFC239' : 'none',
              }"
            />
          </span>

          <div v-if="isEditing.login" class="ml-4">
            <Button
              class="mr-2"
              severity="success"
              label="Salvar"
              size="small"
              icon="pi pi-check"
              text
              @click="handleSaveNome"
            />
            <Button
              class="mr-2"
              severity="danger"
              label="Cancelar"
              size="small"
              icon="pi pi-times"
              text
              @click="handleCancelNome"
            />
          </div>
          <Button
            v-else
            label="Editar"
            size="small"
            icon="pi pi-pencil"
            text
            @click="handleEditNome"
          />
        </div>

        <Divider class="my-4" />

        <!-- Label -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">
            Descrição
          </span>
          <span class="flex-1 text-surface-900 dark:text-surface-0">
            <input
              ref="inputLabelRef"
              v-model="formData.label"
              class="rounded border-none bg-transparent p-1 outline-none"
              :readonly="!isEditing.label"
              :style="{
                outline: isEditing.label ? '1px solid #FFC239' : 'none',
              }"
            />
          </span>

          <div v-if="isEditing.label" class="ml-4">
            <Button
              class="mr-2"
              severity="success"
              label="Salvar"
              size="small"
              icon="pi pi-check"
              text
              @click="handleSaveLabel"
            />
            <Button
              class="mr-2"
              severity="danger"
              label="Cancelar"
              size="small"
              icon="pi pi-times"
              text
              @click="handleCancelLabel"
            />
          </div>
          <Button
            v-else
            label="Editar"
            size="small"
            icon="pi pi-pencil"
            text
            @click="handleEditLabel"
          />
        </div>

        <Divider class="my-4" />

        <!-- Ícone -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">Ícone</span>
          <span class="flex-1 text-surface-900 dark:text-surface-0">
            <div class="flex gap-3">
              <div
                v-show="formData.icon === 'desktop' || isEditing.icon"
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
                v-show="formData.icon === 'user' || isEditing.icon"
                class="interativo cursor-pointer rounded-sm border border-surface-300 bg-surface-0 p-4 dark:border-surface-700 dark:bg-surface-900"
                :style="{
                  outline: formData.icon === 'user' ? '2px solid #FFC239' : '',
                }"
                @click="formData.icon = 'user'"
              >
                <IconUserRound />
              </div>
              <div
                v-show="formData.icon === 'smartphone' || isEditing.icon"
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
                v-show="formData.icon === 'laptop' || isEditing.icon"
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
          </span>

          <div v-if="isEditing.icon" class="ml-4">
            <Button
              class="mr-2"
              severity="success"
              label="Salvar"
              size="small"
              icon="pi pi-check"
              text
              @click="handleSaveIcon"
            />
            <Button
              class="mr-2"
              severity="danger"
              label="Cancelar"
              size="small"
              icon="pi pi-times"
              text
              @click="handleCancelIcon"
            />
          </div>
          <Button
            v-else
            label="Editar"
            size="small"
            icon="pi pi-pencil"
            text
            @click="handleEditIcon"
          />
        </div>
      </div>
    </main>
  </div>
  <ConfirmPopup></ConfirmPopup>
</template>
