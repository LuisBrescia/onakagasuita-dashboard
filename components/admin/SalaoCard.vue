<script setup lang="ts">
import type { Salao } from '@/types/Salao';
import { DiasSemana } from '@/enums/DiasSemana';
import { formatarHorario } from '@/utils/formatarHorario';

const props = defineProps({
  salao: {
    type: Object as PropType<Salao>,
    required: true,
  },
});

const formatarDias = (dias: Set<DiasSemana>) => {
  return Array.from(dias)
    .map((dia: DiasSemana) => {
      return DiasSemana[dia];
    })
    .join(', ');
};

const diasSemanaLetras = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const diasAtivos = computed(() => {
  const raw = props.salao.dias_funcionamento;
  return raw instanceof Set ? raw : new Set(raw);
});
</script>

<template>
  <div
    class="group relative min-w-72 cursor-pointer rounded border border-surface-300 bg-surface-0 p-4 transition-shadow hover:shadow-lg dark:border-surface-700 dark:bg-surface-900"
  >
    <h3 class="mb-2 text-base font-semibold">{{ salao.nome }}</h3>

    <div
      class="rounded-custom absolute right-2 top-2 bg-primary-500 p-2 text-surface-100 opacity-0 transition-opacity group-hover:opacity-100"
    >
      <IconPencil :size="18" />
    </div>

    <div class="mb-2">
      <h4 class="text-xs text-surface-600 dark:text-surface-400">
        Horário de funcionamento
      </h4>
      <p class="text-sm">
        {{ formatarHorario(salao.horario_funcionamento_inicio) }} às
        {{ formatarHorario(salao.horario_funcionamento_fim) }}
      </p>
    </div>

    <div class="mb-2">
      <h4 class="text-xs text-surface-600 dark:text-surface-400">
        Dias de funcionamento
      </h4>

      <div class="week-wrapper mt-2 flex gap-2">
        <span
          v-for="(letra, index) in diasSemanaLetras"
          :key="index"
          class="week-item"
          :class="{ active: diasAtivos.has(index) }"
        >
          <span>{{ letra }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.week-item {
  @apply relative inline-block aspect-square w-6 rounded-full border border-surface-300 text-surface-700 dark:border-surface-700 dark:text-surface-200;
}

.week-item span {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-xs;
}

.week-item.active {
  @apply border-primary-500 bg-primary-500 text-surface-100 dark:border-primary-400 dark:bg-primary-400 dark:text-surface-900;
}
</style>
