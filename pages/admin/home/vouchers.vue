<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated'],
});

onBeforeMount(() => {
  const breadcrumbStore = useBreadcrumbStore();
  breadcrumbStore.setBreadcrumb([
    { name: 'Vouchers', to: '/admin/home/vouchers' },
  ]);
});
</script>

<template>
  <main class="p-4">
    <h1 class="text-2xl">Vouchers</h1>
  </main>
</template>
