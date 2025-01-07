<script setup lang="ts">
defineProps<{
  mesa: any;
}>();
</script>

<template>
  <BaseOperadorMesa
    :mesa="mesa"
    :styles="$style"
    :num-cadeiras="4"
    :maximo-mesa="8"
  />
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
  width: 30%;
  aspect-ratio: 16/9;
  position: absolute;
  border-radius: 25%;

  &:nth-child(1) {
    left: 10%;
    top: -11%;
  }

  &:nth-child(2) {
    right: 10%;
    top: -11%;
  }

  &:nth-child(3) {
    left: 10%;
    bottom: -11%;
  }

  &:nth-child(4) {
    right: 10%;
    bottom: -11%;
  }
}
</style>
