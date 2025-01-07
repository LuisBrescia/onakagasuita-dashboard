<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated'],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb([
  { name: 'Integrações', to: '/admin/home/integracoes' },
]);
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl">Integrações</h1>
  </main>
</template>
