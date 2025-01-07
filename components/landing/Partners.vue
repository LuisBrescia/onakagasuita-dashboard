<script setup>
const franquias = [
  {
    nome: 'Franquia 1',
    logo: 'https://via.placeholder.com/150',
  },
  {
    nome: 'Franquia 2',
    logo: 'https://via.placeholder.com/150',
  },
  {
    nome: 'Franquia 3',
    logo: 'https://via.placeholder.com/150',
  },
  {
    nome: 'Franquia 4',
    logo: 'https://via.placeholder.com/150',
  },
  {
    nome: 'Franquia 5',
    logo: 'https://via.placeholder.com/150',
  },
  {
    nome: 'Franquia 6',
    logo: 'https://via.placeholder.com/150',
  },
];
</script>

<template>
  <div>
    <h1 class="mb-4 text-center text-3xl font-bold">
      Os melhores vão estar com você
    </h1>
    <p
      class="mx-auto mb-8 max-w-2xl text-center text-surface-700 dark:text-surface-0/70"
    >
      Aqui estão alguns de nossos parceiros espalhados pelo Brasil que confiam
      em nossa tecnologia. Você também pode fazer parte.
    </p>
    <div class="mx-auto mb-8 text-center">
      <Button
        label="Conheça todos"
        icon="pi pi-arrow-right"
        icon-pos="right"
        size="small"
        text
        rounded
      />
    </div>

    <div class="mx-auto grid max-w-3xl grid-cols-2 gap-4">
      <LandingPartnerCard
        v-for="franquia in franquias"
        :key="franquia.nome"
        :franquia="franquia"
      />
    </div>
  </div>
</template>
