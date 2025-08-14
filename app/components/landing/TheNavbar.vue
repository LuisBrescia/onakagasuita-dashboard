<script setup>
const route = useRoute();

const checkExact = (path) => {
  console.log(route.path, path);
  return route.path === path ? 'primary' : 'secondary';
};
</script>

<template>
  <BaseNavbar>
    <div class="my-auto flex items-center">
      <Button
        @click="navigateTo('/')"
        :severity="checkExact('/')"
        size="small"
        label="Início"
        text
        arial-label="Início"
      />
      <Button
        @click="navigateTo('/pricing')"
        :severity="checkExact('/pricing')"
        size="small"
        label="Preços"
        text
        arial-label="Preços"
      />
      <Button
        @click="navigateTo('/client/home')"
        :severity="checkExact('/client/home')"
        size="small"
        label="Reservas"
        text
        arial-label="Reservas"
      />
      <Button
        @click="navigateTo('/contact')"
        :severity="checkExact('/contact')"
        size="small"
        label="Contato"
        text
        arial-label="Contato"
      />
    </div>
  </BaseNavbar>
</template>

<style>
.p-button-icon-only {
  color: var(--p-surface-900, red) !important;
  font-weight: 700;
}

.dark .p-button-icon-only {
  color: var(--p-surface-50) !important;
}
</style>
