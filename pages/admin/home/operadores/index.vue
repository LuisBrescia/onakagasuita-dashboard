<script lang="ts" setup>
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import OperadorService from '~/services/OperadorService';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const unidadeStore = useUnidadeStore();
const breadcrumbStore = useBreadcrumbStore();
const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';
breadcrumbStore.setBreadcrumb([
  { name: unidadeNome, to: '/admin/home' },
  { name: 'Operadores', to: '/admin/home/operadores' },
]);

const operadoresData = ref<any[]>([]);
const getOperadores = async () => {
  operadoresData.value = await OperadorService.getAll();
};

onMounted(() => {
  getOperadores();
});

const modalVisible = ref(false);
const formData = ref({
  login: '',
  label: '',
  senha: '',
  icon: '',
});
</script>

<template>
  <main class="relative h-full p-4">
    <div
      class="container mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
      v-if="operadoresData.length"
    >
      <AdminOperadorCard
        v-for="operador in operadoresData"
        :key="operador.id"
        :operador="operador"
        @click="navigateTo(`/admin/home/operadores/${operador.id}`)"
      />
    </div>

    <Button
      class="absolute right-4 top-4"
      color="primary"
      size="small"
      icon="pi pi-plus"
      label="Criar novo operador"
      @click="navigateTo('/admin/home/operadores/adicionar')"
    />
  </main>
</template>
