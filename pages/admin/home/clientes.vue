<script setup>
import { ref } from 'vue';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import { useUnidadeStore } from '@/stores/unidadeStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

const unidadeStore = useUnidadeStore();
const breadcrumbStore = useBreadcrumbStore();

breadcrumbStore.setBreadcrumb([
  { name: unidadeStore.unidade?.nome || 'Unidade', to: '/' },
  { name: 'Clientes', to: '/admin/home/clientes' },
]);

const clientesData = ref([]);

const nomesProprios = [
  'Aria',
  'Liam',
  'Noah',
  'Emma',
  'Olivia',
  'William',
  'James',
  'Sophia',
  'Benjamin',
  'Charlotte',
  'Lucas',
  'Amelia',
  'Mason',
  'Mia',
  'Isabella',
  'Ava',
  'Elijah',
  'Evelyn',
  'Harper',
  'Henry',
  'Alexander',
  'Sebastian',
  'Eleanor',
  'Zoey',
  'Michael',
  'Daniel',
  'Ethan',
  'Luna',
  'Chloe',
  'Madison',
];

const sobrenomes = [
  'Johnson',
  'Brown',
  'Davis',
  'Miller',
  'Garcia',
  'Rodriguez',
  'Martinez',
  'Hernandez',
  'Lopez',
  'Gonzalez',
  'Smith',
  'Anderson',
  'Taylor',
  'Moore',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Thompson',
  'Clark',
  'Lewis',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'King',
  'Scott',
  'Adams',
  'Perez',
  'Baker',
  'Nelson',
  'Carter',
  'Mitchell',
  'Roberts',
  'Turner',
  'Phillips',
];

const gerarNomeAleatorio = () => {
  const primeiroNome =
    nomesProprios[Math.floor(Math.random() * nomesProprios.length)];
  const sobrenome = sobrenomes[Math.floor(Math.random() * sobrenomes.length)];
  return `${primeiroNome} ${sobrenome}`;
};

const gerarEmail = (nome) => {
  const prefixo = nome.toLowerCase().replace(/\s/g, '.');
  return `${prefixo}@email.com`;
};

const gerarTelefone = () => {
  const ddd = Math.floor(Math.random() * 89 + 10);
  const prefixo = Math.floor(Math.random() * 9000 + 1000);
  const sufixo = Math.floor(Math.random() * 9000 + 1000);
  return `${ddd}${prefixo}${sufixo}`;
};

const mascararTelefone = (telefone) => {
  const ddd = telefone.slice(0, 2);
  const prefixo = telefone.slice(2, 6);
  return `(${ddd}) ${prefixo}-****`;
};

const gerarClientes = () => {
  clientesData.value = Array.from({ length: 8 }, (_, i) => {
    const nome = gerarNomeAleatorio();
    return {
      id: i + 1,
      nome,
      email: gerarEmail(nome),
      telefone: gerarTelefone(),
    };
  });
};

gerarClientes();
</script>

<template>
  <div class="page-content">
    <TheTopbar />
    <main class="p-4">
      <div class="mb-8 mt-4 text-center">
        <h1 class="text-2xl font-bold">Lista de Clientes</h1>
        <p class="text-surface-600 dark:text-surface-400">
          Informações dos clientes cadastrados
        </p>
      </div>

      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <template v-for="cliente in clientesData" :key="cliente.id">
          <Card
            class="rounded-md border border-surface-300 p-4 dark:border-surface-700"
          >
            <template #title>
              <h2 class="truncate text-sm font-bold">{{ cliente.nome }}</h2>
            </template>
            <template #subtitle>
              <p class="text-xs text-surface-600 dark:text-surface-400">
                {{ cliente.email }}
              </p>
            </template>
            <template #content>
              <p class="text-xs text-surface-600 dark:text-surface-400">
                {{ mascararTelefone(cliente.telefone) }}
              </p>
            </template>
          </Card>
        </template>
      </div>
    </main>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  padding: 20px;
}

.bg-surface-500 {
  background-color: #e0e0e0;
}
</style>
