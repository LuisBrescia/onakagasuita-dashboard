<script setup lang="ts">
defineProps({
  operador: {
    type: Object as PropType<any>,
    required: true,
  },
});
</script>

<template>
  <div
    class="group relative min-w-72 cursor-pointer rounded border border-surface-300 bg-surface-0 p-4 transition-shadow hover:shadow-lg dark:border-surface-700 dark:bg-surface-900"
  >
    <div class="mb-2">
      <div v-if="operador.icon === 'desktop'">
        <IconMonitor :size="24" />
      </div>
      <div v-else-if="operador.icon === 'user'">
        <IconUser :size="24" />
      </div>
      <div v-else-if="operador.icon === 'smartphone'">
        <IconSmartphone :size="24" />
      </div>
      <div v-else-if="operador.icon === 'laptop'">
        <IconLaptop :size="24" />
      </div>
    </div>

    <h3 class="mb-2 text-base font-semibold">{{ operador.label }}</h3>

    <div
      class="rounded-custom absolute right-2 top-2 bg-primary-500 p-2 text-surface-100 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <IconPencil :size="18" />
    </div>

    <div class="mb-2">
      <h4 class="text-xs text-surface-600 dark:text-surface-400">Login</h4>
      <p class="text-sm">
        {{ operador.login }}
      </p>
    </div>
  </div>
</template>
