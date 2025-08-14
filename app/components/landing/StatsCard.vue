<script setup>
import { computed } from 'vue';

const props = defineProps({
  title: String,
  subject: String,
  icon: String,
  color: String,
});

const colorClasses = {
  blue: {
    bg500: 'bg-blue-500 dark:bg-blue-400',
    bg600: 'bg-blue-600 dark:bg-blue-500',
  },
  red: {
    bg500: 'bg-red-500 dark:bg-red-400',
    bg600: 'bg-red-600 dark:bg-red-500',
  },
  green: {
    bg500: 'bg-green-500 dark:bg-green-400',
    bg600: 'bg-green-600 dark:bg-green-500',
  },
  purple: {
    bg500: 'bg-purple-500 dark:bg-purple-400',
    bg600: 'bg-purple-600 dark:bg-purple-500',
  },
  indigo: {
    bg500: 'bg-indigo-500 dark:bg-indigo-400',
    bg600: 'bg-indigo-600 dark:bg-indigo-500',
  },
  orange: {
    bg500: 'bg-orange-500 dark:bg-orange-400',
    bg600: 'bg-orange-600 dark:bg-orange-500',
  },
};

const selectedClasses = computed(
  () =>
    colorClasses[props.color] || {
      bg500: 'bg-surface-500',
      bg600: 'bg-surface-600',
    },
);
</script>

<template>
  <div
    class="card rounded-custom flex flex-1 flex-col items-center px-8 py-4 text-surface-0 shadow-md"
    :class="selectedClasses.bg500"
  >
    <div
      class="mb-2 grid aspect-square place-items-center rounded-full p-3"
      :class="selectedClasses.bg600"
    >
      <i :class="icon" class="text-2xl" />
    </div>
    <h3 class="text-2xl font-medium">{{ title }}</h3>
    <p class="text-md font-medium text-white opacity-80">{{ subject }}</p>
  </div>
</template>
