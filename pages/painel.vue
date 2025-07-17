<template>
  <div class="flex justify-center gap-4">
    <NuxtLink
      to="/admin/login"
      class="flex items-center gap-2 text-blue-500 hover:text-blue-700"
    >
      <i class="pi pi-lock text-xl"></i>
      Painel administrativo
    </NuxtLink>
    <NuxtLink
      to="/login"
      class="flex items-center gap-2 text-green-500 hover:text-green-700"
    >
      <i class="pi pi-cog text-xl"></i>
      Painel operacional
    </NuxtLink>
    <!-- <NuxtLink to="/client/login" class="flex items-center gap-2 text-purple-500 hover:text-purple-700">
      <i class="pi pi-users text-xl"></i>
      Clientes
    </NuxtLink> -->
  </div>
</template>
