<script lang="ts" setup>
import { useToast } from 'primevue/usetoast';
import type { Pagination } from '~/types/common/Pagination';
import type { ReservaRequest } from '~/types/Reserva';
import type { Unidade } from '~/types/Unidade';
import UnidadeService from '~/services/UnidadeService';
import { useReservaStore } from '@/stores/reservaStore';

type PageState = {
  page: number;
  rows: number;
};

const toast = useToast();
const unidadesData = ref<Unidade[]>([]);
const unidadesPagination = ref<Pagination>({
  total: 0,
  per_page: 8,
  current_page: 1,
  last_page: 1,
});

const formData = ref<ReservaRequest>({
  cliente: {
    nome: '',
    email: '',
    telefone: '',
  },
  unidade_id: 0,
  salao_id: 0,
  horario_selecionado: '',
  num_mesas: 1,
});

const saloes = [
  { id: 1, nome: 'Salão Principal' },
  { id: 2, nome: 'Salão VIP' },
];

const horarios = ['18:00', '19:00', '20:00', '21:00', '22:00'];
const saloesDisponiveis = computed(() => saloes);
const horariosPermitidos = computed(() => horarios);
const modalReserva = ref<boolean>(false);
const getUnidadesLoading = ref<boolean>(false);

const getUnidades = async (pageState: PageState | undefined) => {
  getUnidadesLoading.value = true;
  try {
    const response = await UnidadeService.getAllClient({
      page: pageState ? pageState.page : 1,
      perPage: pageState ? pageState.rows : 8,
      all: true,
    });
    unidadesData.value = response.data;
    unidadesPagination.value = response.meta;
  } catch (error) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Não foi possível carregar as unidades.',
    });
  } finally {
    setTimeout(() => {
      getUnidadesLoading.value = false;
    }, 400);
  }
};

const abrirReserva = (unidade: Unidade) => {
  modalReserva.value = true;
  formData.value.unidade_id = unidade.id;
};

const reservaStore = useReservaStore();

const confirmarReserva = async () => {
  if (!formData.value.cliente.email) {
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: 'Por favor, insira um email válido para continuar a reserva.',
    });
    return;
  }

  try {
    reservaStore.reservaData = {
      cliente_id: 1,
      unidade_id: formData.value.unidade_id,
      salao_id: formData.value.salao_id,
      horario_selecionado: formData.value.horario_selecionado,
      num_mesas: formData.value.num_mesas,
      email: formData.value.cliente.email,
    };

    await reservaStore.confirmarReserva(toast);

    if (reservaStore.success) {
      modalReserva.value = false;
    }
  } catch (error: any) {
    console.error('Erro ao fazer a reserva:', error);
    toast.add({
      severity: 'error',
      summary: 'Erro',
      detail: error.message || 'Não foi possível realizar a reserva. Tente novamente.',
    });
  }
};

onMounted(() => {
  getUnidades(undefined);
});
</script>

<template>
  <div class="container mx-auto">
    <div class="mb-8 text-center">
      <h1 class="text-2xl font-bold">Perto de você</h1>
      <p class="text-surface-600 dark:text-surface-400">
        Lugares próximos de onde você está
      </p>
    </div>

    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <template v-for="unidade in unidadesData" :key="unidade.id">
        <Card
          v-if="!getUnidadesLoading"
          class="rounded-md border border-surface-300 p-2 dark:border-surface-700"
        >
          <template #header>
            <div
              class="mx-auto aspect-video h-32 overflow-hidden rounded-sm bg-surface-500"
            >
              <img
                v-if="unidade.foto"
                :src="unidade.foto"
                alt="Imagem da unidade"
                class="h-full w-full object-cover"
              />
              <div
                v-else
                class="flex h-full w-full items-center justify-center"
              >
                <p class="text-surface-600">Sem imagem</p>
              </div>
            </div>
          </template>
          <template #title>
            <h2 class="truncate text-sm font-bold">
              {{ unidade.nome_fantasia }}
            </h2>
          </template>
          <template #subtitle>
            <p class="text-xs text-surface-600 dark:text-surface-400">
              [TIPO] • [Distância]
            </p>
          </template>
          <template #content>
            <Button
              label="Fazer reserva"
              class="mt-2 w-full text-xs"
              outlined
              severity="secondary"
              @click="abrirReserva(unidade)"
            />
          </template>
        </Card>
        <Skeleton v-else width="100%" height="272px" />
      </template>
    </div>

    <Paginator
      :totalRecords="unidadesPagination.total"
      :rows="unidadesPagination.per_page"
      :rowsPerPageOptions="[8, 16, 24]"
      @page="getUnidades"
      class="mt-4"
    />

    <Dialog
      v-model:visible="modalReserva"
      header="Fazer reserva"
      :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
      blockScroll
      style="min-width: 50vw"
    >
      <form @submit.prevent="confirmarReserva">
        <div class="mb-4">
          <label class="mb-1 block font-bold">Nome</label>
          <InputText
            v-model="formData.cliente.nome"
            placeholder="Digite seu nome"
            class="w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label class="mb-1 block font-bold">Email</label>
          <InputText
            v-model="formData.cliente.email"
            placeholder="Digite seu email"
            class="w-full"
            required
          />
        </div>
        <div class="mb-4">
          <label class="mb-1 block font-bold">Selecione o salão</label>
          <Dropdown
            v-model="formData.salao_id"
            :options="saloesDisponiveis"
            optionLabel="nome"
            placeholder="Selecione um salão"
            class="w-full"
          />
        </div>
        <div class="mb-4">
          <label class="mb-1 block font-bold">Selecione o horário</label>
          <Dropdown
            v-model="formData.horario_selecionado"
            :options="horariosPermitidos"
            placeholder="Selecione um horário"
            class="w-full"
          />
        </div>
        <div class="mb-4">
          <label class="mb-1 block font-bold">Número de mesas</label>
          <InputNumber
            v-model="formData.num_mesas"
            :min="1"
            class="w-full"
          />
        </div>
        <Button type="submit" label="Confirmar" class="w-full" :disabled="!formData.cliente.email || !formData.cliente.nome"/>
      </form>
    </Dialog>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  padding: 20px;
}

.bg-surface-500 {
  background-color: #e0e0e0;
}
</style>
