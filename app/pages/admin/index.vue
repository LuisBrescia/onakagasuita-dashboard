<script setup>
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import { useUsuarioStore } from '@/stores/usuarioStore';
import { useUnidadeStore } from '@/stores/unidadeStore';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated'],
});

const usuarioStore = useUsuarioStore();
const unidadeStore = useUnidadeStore();
const breadcrumbStore = useBreadcrumbStore();
breadcrumbStore.setBreadcrumb([{ name: 'Início', to: '/admin/home/' }]);
</script>

<template>
  <div class="page-content">
    <TheTopbar />
    <main class="page-inner">
      <div class="container mx-auto">
        <p class="text-surface-500 dark:text-surface-400">Usuário</p>
        <h1 class="mb-8 text-xl">{{ usuarioStore.user.nome }}</h1>

        <p class="text-surface-500 dark:text-surface-400">Logado</p>
        <h1 class="text-xl">
          {{
            unidadeStore.unidade
              ? unidadeStore.unidade.nome_fantasia
              : 'Não selecionado'
          }}
        </h1>
      </div>
    </main>
  </div>
</template>
