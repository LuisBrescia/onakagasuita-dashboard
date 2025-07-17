<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { PropType } from 'vue';

const props = defineProps({
  modelValue: {
    type: Array as PropType<number[]>,
    default: () => [],
  },
});

const emit = defineEmits<{
  (event: 'update:modelValue', value: number[]): void;
}>();

const days = [
  { label: 'Domingo', value: 0 },
  { label: 'Segunda-feira', value: 1 },
  { label: 'Terça-feira', value: 2 },
  { label: 'Quarta-feira', value: 3 },
  { label: 'Quinta-feira', value: 4 },
  { label: 'Sexta-feira', value: 5 },
  { label: 'Sábado', value: 6 },
];

const handleWeekClick = (dayValue: number) => {
  const newValue = props.modelValue.includes(dayValue)
    ? props.modelValue.filter((day) => day !== dayValue)
    : [...props.modelValue, dayValue];

  emit('update:modelValue', newValue);
};
</script>

<template>
  <div class="week-wrapper flex gap-2">
    <span
      v-for="item in days"
      class="week-item"
      :class="{ active: modelValue.includes(item.value) }"
      @click="handleWeekClick(item.value)"
    >
      <span>{{ item.label[0] }}</span>
    </span>
  </div>
</template>

<style lang="scss" scoped>
.week-item {
  @apply relative inline-block aspect-square w-8 cursor-pointer rounded-full border border-surface-300 text-surface-700 hover:border-primary-400 dark:border-surface-700 dark:text-surface-200 hover:dark:border-primary-400;
}

.week-item span {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-sm;
}

.week-item.active {
  @apply border-none bg-primary-500 text-surface-100 hover:bg-primary-600 dark:bg-primary-400 dark:text-surface-900 hover:dark:bg-primary-500;
}
</style>
