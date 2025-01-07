<template>
  <div class="px-6 py-20 md:px-12 lg:px-20">
    <div
      class="mb-6 text-center text-4xl font-bold tracking-tighter text-surface-900 dark:text-surface-0 lg:text-6xl"
    >
      Planos Onakagasuita
    </div>
    <div
      class="mb-12 text-center text-xl leading-normal text-surface-700 dark:text-surface-0/70"
    >
      Tenha o mais novo sistema de gerenciamento de reservas e filas por um
      preço que cabe no seu bolso
    </div>
    <div
      class="mx-auto flex max-w-3xl flex-col gap-8 lg:flex-row lg:gap-4 xl:gap-12"
    >
      <div class="card-base flex w-full flex-1 flex-col px-4 py-4 lg:px-6">
        <div
          class="mb-2 text-xl font-medium text-surface-900 dark:text-surface-0"
        >
          Básico
        </div>
        <div class="text-surface-600 dark:text-surface-300">
          Gerencie suas reservas e dê adeus às filas grandes de maneira simples
          e rápida.
        </div>
        <div class="my-4 h-px w-full bg-surface-300 dark:bg-surface-700" />
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">
            R$120
          </span>
          <span class="font-medium text-surface-600 dark:text-surface-300">
            por mês
          </span>
        </div>
        <div class="my-4 h-px w-full bg-surface-300 dark:bg-surface-600" />
        <ul class="flex flex-1 list-none flex-col gap-4">
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span class="leading-6 text-surface-800 dark:text-surface-100">
              Gestão completa de Reservas
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span class="leading-6 text-surface-800 dark:text-surface-100">
              Gestão completa de Fila de Espera em tempo real
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span class="leading-6 text-surface-800 dark:text-surface-100">
              Pacote de 100 SMS para Fila, Reserva e Pesquisa de Satisfação
            </span>
          </li>
        </ul>
        <div class="my-4 h-px w-full bg-surface-300 dark:bg-surface-700" />
        <Button severity="contrast" label="Tenho interesse" class="px-5 py-3" />
      </div>
      <div class="card-base flex w-full flex-1 flex-col px-4 py-4 lg:px-6">
        <div
          class="mb-2 text-xl font-medium text-surface-900 dark:text-surface-0"
        >
          Premium
        </div>
        <div class="text-surface-600 dark:text-surface-300">
          Tenha tudo do Plano Básico e crie um relacionamento com seu cliente.
        </div>
        <div class="my-4 h-px w-full bg-surface-300 dark:bg-surface-700" />
        <div class="flex items-center gap-2">
          <span class="text-2xl font-bold text-surface-900 dark:text-surface-0">
            R$250
          </span>
          <span class="font-medium text-surface-600 dark:text-surface-300">
            por mês
          </span>
        </div>
        <div class="my-4 h-px w-full bg-surface-300 dark:bg-surface-700" />
        <ul class="flex flex-1 list-none flex-col gap-4">
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span
              class="font-bold leading-6 text-surface-800 dark:text-surface-100"
            >
              Todas as funcionalidades do Plano Básico, mais:
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span class="leading-6 text-surface-800 dark:text-surface-100">
              Campanhas de mensagens e Email Marketing (CRM)
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span class="leading-6 text-surface-800 dark:text-surface-100">
              E-mails ilimitados para Fila e Reserva
            </span>
          </li>
          <li class="flex items-center gap-2">
            <i class="pi pi-check-circle text-lg text-green-500" />
            <span class="leading-6 text-surface-800 dark:text-surface-100">
              Pacote de 1.000 SMS para Fila, Reserva, Pesquisa de Satisfação e
              CRM
            </span>
          </li>
        </ul>
        <div class="my-4 h-px w-full bg-surface-300 dark:bg-surface-700" />
        <Button label="Tenho interesse" class="px-5 py-3" />
      </div>
    </div>
  </div>
</template>
