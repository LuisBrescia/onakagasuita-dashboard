<script setup lang="ts">
defineProps<{
  mesa: any;
}>();
</script>

<template>
  <BaseMesa :mesa="mesa" :styles="$style" :num-cadeiras="2" :maximo-mesa="4" />
</template>

<style lang="scss" module>
.c-drag-element {
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
}

.c-drag-element__fill {
  border-radius: 0.5rem;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 11;
}

.c-drag-element__chair {
  width: 50%;
  position: absolute;
  aspect-ratio: 16/9;
  border-radius: 25%;
  z-index: 10;

  &:nth-child(1) {
    left: 50%;
    top: -10%;
    transform: translateX(-50%);
  }

  &:nth-child(2) {
    left: 50%;
    bottom: -10%;
    transform: translateX(-50%);
  }
}
</style>
