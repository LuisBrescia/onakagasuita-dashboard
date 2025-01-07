<script setup>
definePageMeta({
  layout: 'clientauth',
});
</script>

<template>
  <p class="mb-8 text-sm text-surface-700 dark:text-surface-0/70">
    Bem-vindo ao sistema de reservas do Onakagasuita! 
    Para fazer uma reserva, por favor, preencha suas informações de contato e selecione a unidade e o horário desejado.
    Se já possui uma conta, faça o login para continuar sua reserva.
  </p>

  <ul class="m-0 list-none p-0">
    <li class="mb-6 flex justify-start">
      <div>
        <span
          class="rounded-custom flex h-[38px] w-[38px] items-center justify-center bg-surface-950 text-surface-0 dark:bg-surface-0 dark:text-surface-900"
        >
          <i class="pi pi-calendar"></i>
        </span>
      </div>
      <div class="ml-4">
        <span class="mb-12">Fazer Reserva</span>
        <p class="mt-1 text-sm text-surface-700 dark:text-surface-0/70">
          Insira suas informações e escolha uma unidade e horário para fazer sua reserva.
        </p>
      </div>
    </li>
    <li class="mb-6 flex justify-start">
      <div>
        <span
          class="rounded-custom flex h-[38px] w-[38px] items-center justify-center bg-surface-950 text-surface-0 dark:bg-surface-0 dark:text-surface-950"
        >
          <i class="pi pi-users"></i>
        </span>
      </div>
      <div class="ml-4">
        <span class="mb-12">Cadastro ou Login</span>
        <p class="mt-1 text-sm text-surface-700 dark:text-surface-0/70">
          Caso ainda não tenha uma conta, registre-se para realizar reservas facilmente.
        </p>
      </div>
    </li>
    <li class="flex justify-start">
      <div>
        <span
          class="rounded-custom flex h-[38px] w-[38px] items-center justify-center bg-surface-950 text-surface-0 dark:bg-surface-0 dark:text-surface-950"
        >
          <i class="pi pi-bell"></i>
        </span>
      </div>
      <div class="ml-4">
        <span class="mb-12">Notificações em Tempo Real</span>
        <p class="mt-1 text-sm text-surface-700 dark:text-surface-0/70">
          Fique atento às atualizações sobre sua reserva e possíveis alterações de horário.
        </p>
      </div>
    </li>
  </ul>
</template>
