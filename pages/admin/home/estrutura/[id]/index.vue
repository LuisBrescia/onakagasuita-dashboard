<script setup lang="ts">
import type { SalaoRequest } from '@/types/Salao';
import { DiasSemana } from '@/enums/DiasSemana';
import { formatarHorario } from '@/utils/formatarHorario';
import { useToast } from 'primevue/usetoast';
import SalaoService from '@/services/SalaoService';
import { useRoute, useRouter } from 'vue-router';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import { ref, onBeforeMount } from 'vue';
import { useUnidadeStore } from '@/stores/unidadeStore';
import { useConfirm } from 'primevue/useconfirm';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const route = useRoute();
const router = useRouter();
const breadcrumbStore = useBreadcrumbStore();
const unidadeStore = useUnidadeStore();
const toast = useToast();
const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';

const formData = ref<any>({
  nome: '',
  ativo: true,
  horarioFuncionamentoInicio: null,
  horarioFuncionamentoFinal: null,
  diasFuncionamento: [],
});

const originalData = ref<any>({});

const diasFuncionamentoOptions = [
  { label: 'Domingo', value: DiasSemana.DOMINGO },
  { label: 'Segunda-feira', value: DiasSemana.SEGUNDA },
  { label: 'Terça-feira', value: DiasSemana.TERCA },
  { label: 'Quarta-feira', value: DiasSemana.QUARTA },
  { label: 'Quinta-feira', value: DiasSemana.QUINTA },
  { label: 'Sexta-feira', value: DiasSemana.SEXTA },
  { label: 'Sábado', value: DiasSemana.SABADO },
];

const isEditing = ref({
  nome: false,
  diasFuncionamento: false,
  horarioFuncionamentoInicio: false,
  horarioFuncionamentoFinal: false,
});

const inputNomeRef = ref<HTMLInputElement | null>(null);

const handleEditNome = () => {
  isEditing.value.nome = true;
  inputNomeRef.value?.focus();
  inputNomeRef.value?.select();
};

const handleSaveNome = async () => {
  const salaoRequest: Partial<SalaoRequest> = {
    nome: formData.value.nome,
  };
  await updateSalao(Number(route.params.id), salaoRequest);
  originalData.value.nome = formData.value.nome;
  isEditing.value.nome = false;
};

const handleCancelNome = () => {
  formData.value.nome = originalData.value.nome;
  isEditing.value.nome = false;
};

const handleEditDiasFuncionamento = () => {
  isEditing.value.diasFuncionamento = true;
};

const handleSaveDiasFuncionamento = async () => {
  const salaoRequest: Partial<SalaoRequest> = {
    dias_funcionamento: formData.value.diasFuncionamento,
  };
  await updateSalao(Number(route.params.id), salaoRequest as SalaoRequest);
  originalData.value.diasFuncionamento = [...formData.value.diasFuncionamento];
  isEditing.value.diasFuncionamento = false;
};

const handleCancelDiasFuncionamento = () => {
  formData.value.diasFuncionamento = [...originalData.value.diasFuncionamento];
  isEditing.value.diasFuncionamento = false;
};

const handleEditHorarioInicio = () => {
  isEditing.value.horarioFuncionamentoInicio = true;
  formData.value.horarioFuncionamentoInicio = converterHoraParaISO(
    originalData.value.horarioFuncionamentoInicio,
  );
};

const handleSaveHorarioInicio = async () => {
  const salaoRequest: Partial<SalaoRequest> = {
    horario_funcionamento_inicio: formatarHorario(
      formData.value.horarioFuncionamentoInicio,
    ),
  };
  await updateSalao(Number(route.params.id), salaoRequest);
  originalData.value.horarioFuncionamentoInicio =
    formData.value.horarioFuncionamentoInicio;
  isEditing.value.horarioFuncionamentoInicio = false;
};

const handleCancelHorarioInicio = () => {
  formData.value.horarioFuncionamentoInicio =
    originalData.value.horarioFuncionamentoInicio;
  isEditing.value.horarioFuncionamentoInicio = false;
};

const handleEditHorarioFinal = () => {
  isEditing.value.horarioFuncionamentoFinal = true;
  formData.value.horarioFuncionamentoFinal = converterHoraParaISO(
    originalData.value.horarioFuncionamentoFinal,
  );
};

const handleSaveHorarioFinal = async () => {
  const salaoRequest: Partial<SalaoRequest> = {
    horario_funcionamento_fim: formatarHorario(
      formData.value.horarioFuncionamentoFinal,
    ),
  };
  await updateSalao(Number(route.params.id), salaoRequest);
  originalData.value.horarioFuncionamentoFinal =
    formData.value.horarioFuncionamentoFinal;
  isEditing.value.horarioFuncionamentoFinal = false;
};

const handleCancelHorarioFinal = () => {
  formData.value.horarioFuncionamentoFinal =
    originalData.value.horarioFuncionamentoFinal;
  isEditing.value.horarioFuncionamentoFinal = false;
};

const handleFormSubmit = async () => {
  const salaoRequest: SalaoRequest = {
    nome: formData.value.nome,
    ativo: formData.value.ativo,
    horario_funcionamento_inicio: formatarHorario(
      formData.value.horarioFuncionamentoInicio,
    ),
    horario_funcionamento_fim: formatarHorario(
      formData.value.horarioFuncionamentoFinal,
    ),
    dias_funcionamento: formData.value.diasFuncionamento,
  };

  await updateSalao(Number(route.params.id), salaoRequest);
  router.push('/admin/home/estrutura');
};

const updateSalao = async (id: number, salaoRequest: Partial<SalaoRequest>) => {
  try {
    await SalaoService.update(id, salaoRequest as SalaoRequest);
    toast.add({
      severity: 'success',
      summary: 'Salão atualizado com sucesso',
      life: 3000,
    });
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao atualizar salão',
      life: 3000,
    });
  }
};

const deleteSalao = async () => {
  try {
    await SalaoService.delete(Number(route.params.id));
    toast.add({
      severity: 'success',
      summary: 'Salão apagado com sucesso',
      life: 3000,
    });
    router.push('/admin/home/estrutura');
  } catch (error) {
    console.error(error);
    toast.add({
      severity: 'error',
      summary: 'Erro ao apagar salão',
      life: 3000,
    });
  }
};

const converterHoraParaISO = (hora: string) => {
  return hora ? new Date(hora) : null;
};

const getSalao = async () => {
  const salao = await SalaoService.get(Number(route.params.id));
  formData.value = {
    nome: salao.nome,
    ativo: salao.ativo,
    horarioFuncionamentoInicio: converterHoraParaISO(
      salao.horario_funcionamento_inicio,
    ),
    horarioFuncionamentoFinal: converterHoraParaISO(
      salao.horario_funcionamento_fim,
    ),
    diasFuncionamento: salao.dias_funcionamento,
  };

  // Criar uma cópia profunda dos dados originais
  originalData.value = JSON.parse(JSON.stringify(formData.value));
};

const getDiaSemana = (dia: DiasSemana) => {
  return diasFuncionamentoOptions.find((d) => d.value === dia)?.label;
};

onBeforeMount(async () => {
  if (!route.params.id) {
    return router.push('/admin/home/estrutura');
  }

  await getSalao();
  breadcrumbStore.setBreadcrumb([
    { name: unidadeNome, to: '/admin/home/' },
    { name: 'Estrutura', to: '/admin/home/estrutura' },
    {
      name: formData.value.nome ?? 'Salão',
      to: `/admin/home/estrutura/${route.params.id}`,
    },
  ]);
});

const confirm = useConfirm();
const confirmDeleteSalao = (event: any) => {
  confirm.require({
    target: event.currentTarget,
    message: 'Tem certeza que deseja apagar este salão?',
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
      deleteSalao();
    },
  });
};
</script>

<template>
  <div class="page-content">
    <TheTopbar>
      <template #actions>
        <Button
          label="Voltar"
          @click="navigateTo('/admin/home/estrutura')"
          size="small"
          outlined
          icon="pi pi-arrow-left"
          severity="secondary"
        />

        <Button
          label="Montar layout"
          icon="pi pi-th-large"
          size="small"
          severity="info"
          @click="
            router.push(`/admin/home/estrutura/${route.params.id}/layout`)
          "
        />

        <Button
          label="Apagar salão"
          icon="pi pi-trash"
          size="small"
          severity="danger"
          outlined
          @click="confirmDeleteSalao"
        />
      </template>
    </TheTopbar>

    <main class="page-inner container mx-auto flex h-full flex-col">
      <span class="my-8 text-center">
        <div class="text-2xl">Gerenciamento de salão</div>
        <p class="text-base text-surface-600 dark:text-surface-400">
          As informações são salvas automaticamente.
        </p>
      </span>

      <div
        class="rounded border border-surface-300 bg-surface-0 p-4 text-sm dark:border-surface-700 dark:bg-surface-900"
      >
        <!-- Nome -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">Nome</span>
          <span class="flex-1 text-surface-900 dark:text-surface-0">
            <input
              ref="inputNomeRef"
              v-model="formData.nome"
              class="rounded border-none bg-transparent p-1 outline-none"
              :readonly="!isEditing.nome"
              :style="{
                outline: isEditing.nome ? '1px solid #FFC239' : 'none',
              }"
            />
          </span>

          <div v-if="isEditing.nome" class="ml-4">
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

        <!-- Dias de funcionamento -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">
            Dias de funcionamento
          </span>
          <span
            class="flex flex-1 flex-wrap gap-2 text-surface-900 dark:text-surface-0"
          >
            <template v-if="!isEditing.diasFuncionamento">
              <span
                v-for="dia in formData.diasFuncionamento"
                :key="dia"
                class="rounded-full bg-surface-100 p-2 px-4 dark:bg-surface-800"
              >
                {{ getDiaSemana(dia) }}
              </span>
            </template>
            <template v-else>
              <MultiSelect
                v-model="formData.diasFuncionamento"
                :options="diasFuncionamentoOptions"
                optionLabel="label"
                optionValue="value"
              />
            </template>
          </span>

          <div v-if="isEditing.diasFuncionamento" class="ml-4">
            <Button
              class="mr-2"
              severity="success"
              label="Salvar"
              size="small"
              icon="pi pi-check"
              text
              @click="handleSaveDiasFuncionamento"
            />
            <Button
              class="mr-2"
              severity="danger"
              label="Cancelar"
              size="small"
              icon="pi pi-times"
              text
              @click="handleCancelDiasFuncionamento"
            />
          </div>
          <Button
            v-else
            label="Editar"
            size="small"
            icon="pi pi-pencil"
            text
            @click="handleEditDiasFuncionamento"
          />
        </div>

        <Divider class="my-4" />

        <!-- Horário de funcionamento início -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">
            Horário de funcionamento início
          </span>
          <span class="flex flex-1 gap-2 text-surface-900 dark:text-surface-0">
            <template v-if="!isEditing.horarioFuncionamentoInicio">
              {{ formatarHorario(formData.horarioFuncionamentoInicio) }}
            </template>
            <template v-else>
              <DatePicker
                v-model="formData.horarioFuncionamentoInicio"
                showIcon
                fluid
                iconDisplay="input"
                timeOnly
              >
                <template #inputicon="slotProps">
                  <i class="pi pi-clock" @click="slotProps.clickCallback" />
                </template>
              </DatePicker>
            </template>
          </span>

          <div v-if="isEditing.horarioFuncionamentoInicio" class="ml-4">
            <Button
              class="mr-2"
              severity="success"
              label="Salvar"
              size="small"
              icon="pi pi-check"
              text
              @click="handleSaveHorarioInicio"
            />
            <Button
              class="mr-2"
              severity="danger"
              label="Cancelar"
              size="small"
              icon="pi pi-times"
              text
              @click="handleCancelHorarioInicio"
            />
          </div>
          <Button
            v-else
            class="ml-4"
            label="Editar"
            size="small"
            icon="pi pi-pencil"
            text
            @click="handleEditHorarioInicio"
          />
        </div>

        <Divider class="my-4" />

        <!-- Horário de funcionamento final -->
        <div class="flex items-center px-2">
          <span class="w-64 text-surface-600 dark:text-surface-400">
            Horário de funcionamento final
          </span>
          <span class="flex flex-1 gap-2 text-surface-900 dark:text-surface-0">
            <template v-if="!isEditing.horarioFuncionamentoFinal">
              {{ formatarHorario(formData.horarioFuncionamentoFinal) }}
            </template>
            <template v-else>
              <DatePicker
                v-model="formData.horarioFuncionamentoFinal"
                showIcon
                fluid
                iconDisplay="input"
                timeOnly
              >
                <template #inputicon="slotProps">
                  <i class="pi pi-clock" @click="slotProps.clickCallback" />
                </template>
              </DatePicker>
            </template>
          </span>

          <div v-if="isEditing.horarioFuncionamentoFinal" class="ml-4">
            <Button
              class="mr-2"
              severity="success"
              label="Salvar"
              size="small"
              icon="pi pi-check"
              text
              @click="handleSaveHorarioFinal"
            />
            <Button
              class="mr-2"
              severity="danger"
              label="Cancelar"
              size="small"
              icon="pi pi-times"
              text
              @click="handleCancelHorarioFinal"
            />
          </div>
          <Button
            v-else
            class="ml-4"
            label="Editar"
            size="small"
            icon="pi pi-pencil"
            text
            @click="handleEditHorarioFinal"
          />
        </div>
      </div>
    </main>
  </div>
  <ConfirmPopup />
</template>
