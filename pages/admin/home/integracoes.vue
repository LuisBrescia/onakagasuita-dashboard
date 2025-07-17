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
  <div class="page-content">
    <TheTopbar />
    <main class="page-inner">
      <h1 class="text-2xl">Integrações</h1>
    </main>
  </div>
</template>
