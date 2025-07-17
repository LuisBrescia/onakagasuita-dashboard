<script setup lang="ts">
import type { SalaoRequest } from '@/types/Salao';
import { DiasSemana } from '@/enums/DiasSemana';
import { formatarHorario } from '@/utils/formatarHorario';
import { useToast } from 'primevue/usetoast';
import SalaoService from '@/services/SalaoService';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

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
  { name: 'Estrutura', to: '/admin/home/estrutura' },
  { name: 'Adicionar', to: '/admin/home/estrutura/adicionar' },
]);

// type PrimeVueTime = Date | Date[] | (Date | null)[] | null | undefined;
const formData = ref<any>({
  nome: '',
  ativo: true,
  horario_funcionamento_inicio: null,
  horario_funcionamento_fim: null,
  dias_funcionamento: null,
});

const diasFuncionamentoOptions = [
  { label: 'Domingo', value: DiasSemana.DOMINGO },
  { label: 'Segunda-feira', value: DiasSemana.SEGUNDA },
  { label: 'Terça-feira', value: DiasSemana.TERCA },
  { label: 'Quarta-feira', value: DiasSemana.QUARTA },
  { label: 'Quinta-feira', value: DiasSemana.QUINTA },
  { label: 'Sexta-feira', value: DiasSemana.SEXTA },
  { label: 'Sábado', value: DiasSemana.SABADO },
];

const handleFormSubmitLoading = ref(false);
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

  handleFormSubmitLoading.value = true;
  try {
    await createSalao(salaoRequest);
  } finally {
    handleFormSubmitLoading.value = false;
  }
};

const createSalao = async (salaoRequest: SalaoRequest) => {
  try {
    await SalaoService.create(salaoRequest);
    toast.add({
      severity: 'success',
      summary: 'Salão criado com sucesso',
      life: 3000,
    });
    navigateTo('/admin/home/estrutura');
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: error._data.message,
      life: 3000,
    });
  }
};

const converterHoraParaISO = (hora: string) => {
  return hora ? new Date(hora) : null;
};

const getSalao = async (id: number) => {
  const salao = await SalaoService.get(id);
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
          severity="success"
          size="small"
          icon="pi pi-save"
          label="Salvar"
          :loading="handleFormSubmitLoading"
          @click="handleFormSubmit"
        />
      </template>
    </TheTopbar>

    <main class="page-inner container mx-auto flex h-full flex-col">
      <span class="my-8 text-center">
        <div class="text-2xl">Novo salão</div>
        <p class="text-base text-surface-600 dark:text-surface-400">
          Será exibido no painel operacional automaticamente.
        </p>
      </span>

      <div
        class="rounded border border-surface-300 bg-surface-0 p-4 text-sm dark:border-surface-700 dark:bg-surface-900"
      >
        <div class="mx-auto grid w-full grid-cols-1 gap-8 md:grid-cols-2">
          <!--* Nome -->
          <div class="flex flex-col gap-2">
            <label for="nome">Nome</label>
            <InputText
              id="nome"
              v-model="formData.nome"
              aria-describedby="Nome-help"
            />
          </div>

          <!--* Dias de funcionamento -->
          <div class="flex flex-col gap-2">
            <label for="horarioInicio">Dias semana</label>
            <MultiSelect
              v-model="formData.diasFuncionamento"
              :options="diasFuncionamentoOptions"
              optionLabel="label"
              optionValue="value"
            />
          </div>

          <!--* Horário de funcionamento inicial -->
          <div class="flex flex-col gap-2">
            <label for="horarioInicio">Horário início</label>
            <DatePicker
              id="horarioInicio"
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
          </div>

          <!--* Horário de funcionamento final -->
          <div class="flex flex-col gap-2">
            <label for="horarioFinal">Horário final</label>
            <DatePicker
              id="horarioFinal"
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
          </div>
        </div>
      </div>
    </main>
  </div>
</template>
