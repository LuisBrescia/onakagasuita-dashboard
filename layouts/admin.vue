<script setup>
const mainElementKey = ref(0);
</script>

<template>
  <div class="flex min-h-screen">
    <TheSidebar @unidade-selected="mainElementKey++" />
    <Toast />
    <main
      class="flex flex-1 bg-surface-100 px-8 dark:bg-surface-800"
      :key="mainElementKey"
    >
      <slot />
    </main>
  </div>
</template>
