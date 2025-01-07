<template>
  <div class="flex flex-col gap-4 lg:flex-row">
    <div class="flex flex-1 items-center justify-center">
      <div class="p-6 pt-12 lg:p-12">
        <h1
          class="mb-4 text-center text-3xl font-bold tracking-tighter text-surface-900 dark:text-surface-0 lg:text-left lg:text-5xl lg:leading-normal"
        >
          Sistema de gestão
          <br />
          <span class="text-primary-500 dark:text-primary-400">
            de reservas e filas moderno
          </span>
        </h1>
        <p
          class="mb-8 text-center leading-normal text-surface-700 dark:text-surface-200 lg:text-left"
        >
          De restaurantes a grandes redes, o Onakagasuita está aqui para
          proporcionar a melhor experiência para os seus clientes e aumentar
          seus lucros.
        </p>
        <div class="flex items-center justify-center gap-4 lg:justify-start">
          <Button
            severity="contrast"
            label="Conhecer Onakagasuita"
            type="button"
          />
          <Button
            @click="navigateTo('/admin/login')"
            outlined
            label="Fazer login"
            severity="secondary"
            type="button"
          />
        </div>
      </div>
    </div>
    <div class="mg flex-1 overflow-hidden drop-shadow-2xl">
      <img
        src="https://fqjltiegiezfetthbags.supabase.co/storage/v1/render/image/public/block.images/blocks/hero/hero-1.png"
        alt="hero-1"
        class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
      />
      <!-- <img
        src="/grupo.jpg"
        alt="hero-1"
        class="h-full w-full object-cover lg:[clip-path:polygon(12%_0,100%_0%,100%_100%,0_100%)]"
      /> -->
    </div>
  </div>
</template>
