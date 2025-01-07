<script setup lang="ts">
import { useUnidadeStore } from '@/stores/unidadeStore';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import SalaoService from '@/services/SalaoService';
import type { Salao } from '@/types/Salao';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const breadcrumbStore = useBreadcrumbStore();
const unidadeStore = useUnidadeStore();
const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';
breadcrumbStore.setBreadcrumb([
  { name: unidadeNome, to: '/admin/home' },
  { name: 'Estrutura', to: '/admin/home/estrutura' },
]);

const saloesData = ref<Salao[]>([]);
const getSaloes = async () => {
  saloesData.value = await SalaoService.getAll();
};

onMounted(() => {
  getSaloes();
});
</script>

<template>
  <main class="relative h-full p-4">
    <div
      class="container mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3"
      v-if="saloesData.length"
    >
      <AdminSalaoCard
        v-for="salao in saloesData"
        :key="salao.id"
        :salao="salao"
        @click="navigateTo(`/admin/home/estrutura/${salao.id}`)"
      />
    </div>

    <div v-else class="grid h-full place-items-center">
      <p class="text-center text-xl">Nenhum salão cadastrado</p>
    </div>

    <Button
      class="absolute right-4 top-4 rounded-full w-12 h-12 flex items-center justify-center"
      color="primary"
      icon="pi pi-plus"
      @click="navigateTo('/admin/home/estrutura/adicionar')"
    />
  </main>
</template>
