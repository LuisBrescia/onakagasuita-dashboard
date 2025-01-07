<template>
  <div class="px-6 py-20 md:px-12 lg:px-20">
    <div class="text-center text-surface-700 dark:text-surface-100">
      <div class="mb-4 font-bold text-yellow-400 dark:text-yellow-300">
        <i class="pi pi-shop" />
        &nbsp;POWERED BY IHUNGRY
      </div>
      <div class="mb-4 text-5xl font-bold text-surface-900 dark:text-surface-0">
        Conte com a gente
      </div>
      <div class="mb-8 text-2xl text-surface-700 dark:text-surface-0/70">
        Nosso time de suporte está preparado para ajudar você em toda sua
        jornada conosco.
      </div>
      <Button
        @click="navigateTo('/pricing')"
        label="Conhecer planos"
        severity="contrast"
      />
    </div>
  </div>
</template>
