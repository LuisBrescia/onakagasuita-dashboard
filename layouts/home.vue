<template>
  <div class="flex h-screen gap-4 p-4">
    <TheSidebarAntiga />
    <div class="mx-auto max-h-screen flex-1 overflow-x-hidden">
      <slot />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();

const currentRoute = computed(() => {
  return useRoute().path;
});

const currentTab = computed(() => {
  return tabs.find((tab) => {
    return tab.path === currentRoute.value;
  });
});
</script>
