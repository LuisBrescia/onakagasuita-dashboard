<script setup>
const stats = [
  {
    title: '+2K',
    subject: 'Restaurantes ativos',
    icon: 'pi pi-crown',
    color: 'blue',
  },
  {
    title: '4.7M',
    subject: 'Reservas e filas (2025)',
    icon: 'pi pi-address-book',
    color: 'purple',
  },
  {
    title: '+800K',
    subject: 'Usuários cadastrados no app',
    icon: 'pi pi-users',
    color: 'indigo',
  },
  {
    title: '12.9M',
    subject: 'Consumidores atendidos',
    icon: 'pi pi-bullseye',
    color: 'orange',
  },
];
</script>

<template>
  <div class="grid grid-cols-1 gap-12 md:grid-cols-2 xl:grid-cols-4">
    <LandingStatsCard
      v-for="stat in stats"
      :title="stat.title"
      :subject="stat.subject"
      :icon="stat.icon"
      :color="stat.color"
    />
  </div>
</template>
