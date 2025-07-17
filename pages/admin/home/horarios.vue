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
  { name: 'Horarios', to: '/admin/home/horarios' },
]);
</script>

<template>
  <div class="page-content">
    <TheTopbar />

    <main>
      <h1 class="text-2xl">Gerenciar mesas</h1>
    </main>
  </div>
</template>
