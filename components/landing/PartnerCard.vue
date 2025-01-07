<script setup>
defineProps({
  franquia: Object,
});
</script>

<template>
  <div
    class="card grid place-items-center border border-surface-200 bg-surface-50 bg-opacity-75 p-8 dark:border-surface-700 dark:bg-surface-900 dark:bg-opacity-75"
  >
    <!-- <img
      :src="franquia.logo"
      alt="logo"
      class="mb-4 aspect-square h-12 w-12 rounded-full object-contain"
    /> -->
    <Avatar :src="franquia.logo" class="mb-4" size="large" />
    <span class="text-sm font-medium">
      {{ franquia.nome }}
    </span>
    <div class="w-24">
      <Divider />
    </div>
    <span class="cursor-pointer text-xs hover:underline">Visitar</span>
  </div>
</template>
