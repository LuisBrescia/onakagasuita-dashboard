<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const unidadeStore = useUnidadeStore();
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb([
  { name: unidadeStore.unidade.nome_fantasia, to: '/' },
  { name: 'Regras de negócio', to: '/admin/home/regras' },
]);
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl">Gerenciar mesas</h1>
  </main>
</template>
