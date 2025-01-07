<script setup>
const mainElementKey = ref(0);
</script>

<template>
  <div class="flex min-h-screen">
    <TheSidebar @unidade-selected="mainElementKey++" />
    <Toast />
    <main
      class="flex flex-1 flex-col bg-surface-100 dark:bg-surface-800"
      :key="mainElementKey"
    >
      <TheTopbar />
      <slot />
    </main>
  </div>
</template>
