<script setup lang="ts"></script>

<template>
  <nav
    class="bg-surface-white mb-4 flex justify-between border-b border-surface-300 bg-surface-0 px-4 py-3 dark:border-surface-700 dark:bg-surface-900"
  >
    <!-- <nav
    class="bg-surface-white mb-8 flex justify-between border-surface-300 pt-6 dark:border-surface-700"
  > -->
    <TheBreadcrumb />

    <div class="flex items-center gap-2">
      <slot name="actions" />
      <Button
        size="small"
        icon="pi pi-info-circle"
        severity="secondary"
        outlined
        :label="$t('actions.tour')"
      />
    </div>

    <!-- * Searchbox -->
    <!-- <div
      class="rounded-custom flex cursor-pointer items-center p-2 dark:bg-surface-800"
    >
      <IconSearch :size="12" />
      <span class="ml-2 text-xs text-surface-500">Pesquisar onakagasuita</span>
    </div> -->

    <!-- * Botão de perfil -->
    <!-- <Button
      class="rounded-custom px-1 py-[2px]"
      text
      severity="secondary"
      size="small"
      @click="toggle"
    >
      <div class="inline-flex items-center">
        <AppAvatar
          v-if="usuarioStore.user.nome"
          class="mr-2"
          :letra="usuarioStore.user.nome[0]"
        />
        <Skeleton v-else shape="circle" size="1.6rem" class="mr-2"></Skeleton>
        <span class="text-xs">{{ usuarioStore.user.nome }}</span>
      </div>
      <IconChevronDown
        :size="16"
        class="text-surface-500 dark:text-surface-400"
      />
    </Button> -->
  </nav>
</template>
