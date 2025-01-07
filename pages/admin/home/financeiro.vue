<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated'],
});

const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb([
  { name: 'Financeiro', to: '/admin/home/financeiro' },
]);
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl">Gerenciar mesas</h1>
  </main>
</template>
