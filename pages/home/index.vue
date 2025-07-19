<script setup lang="ts">
import { GridStack } from 'gridstack';
import type {
  GridItemHTMLElement,
  GridStackNode,
  GridStackElement,
} from 'gridstack';
import 'gridstack/dist/gridstack.min.css';

import { useUnidadeStore } from '@/stores/unidadeStore';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import SalaoService from '@/services/SalaoService';
import type { Salao } from '@/types/Salao';
import {
  MesaPequenaCircular,
  MesaPequenaQuadrada,
  MesaGrandeRetangular,
} from '@/components/common/operador/_index';

definePageMeta({
  layout: 'clean',
  middleware: ['operador-authenticated'],
});

type ItemMesa = {
  id?: string; // ID
  x: number; // Posição X
  y: number; // Posição Y
  w?: number; // Largura
  h?: number; // Altura
};

type TipoMesa = 'pequenaCircular' | 'pequenaQuadrada' | 'grandeRetangular';

interface MesaType {
  w: number;
  h: number;
  component: any;
  minimo_pessoas: number;
  maximo_pessoas: number;
}

const mesasTipo: Record<TipoMesa, MesaType> = {
  pequenaCircular: {
    w: 2,
    h: 2,
    component: markRaw(MesaPequenaCircular),
    minimo_pessoas: 1,
    maximo_pessoas: 4,
  },
  pequenaQuadrada: {
    w: 2,
    h: 2,
    component: markRaw(MesaPequenaQuadrada),
    minimo_pessoas: 1,
    maximo_pessoas: 4,
  },
  grandeRetangular: {
    w: 3,
    h: 2,
    component: markRaw(MesaGrandeRetangular),
    minimo_pessoas: 3,
    maximo_pessoas: 6,
  },
};

const count = ref(0);
const info = ref('');
const color = ref('black');
const gridInfo = ref('');
const toast = useToast();
let grid: GridStack | null = null; // DO NOT use ref(null) as proxies GS will break all logic when comparing structures... see https://github.com/gridstack/gridstack.js/issues/2115
const mesasData = ref<any[]>([]);

const breadcrumbStore = useBreadcrumbStore();
const unidadeStore = useUnidadeStore();
const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';

const saloesData = ref<Salao[]>([]);
const getSaloes = async () => {
  saloesData.value = await SalaoService.getAll();
  if (formData.salaoId === -1) {
    formData.salaoId = saloesData.value[0].id;
  }
};

const formData = reactive({
  salaoId: -1,
});

const carregarLayout = async () => {
  grid?.removeAll();
  mesasData.value = [];
  getLayout();
};

const carregarMesa = (mesa: any) => {
  const node = {
    ...mesasTipo[mesa.tipo as TipoMesa],
    ...mesa,
  };

  count.value++;
  mesasData.value.push(node);
  nextTick(() => {
    grid?.makeWidget(node.id);
  });
};

const getLayout = async () => {
  const res = (await SalaoService.getLayout(formData.salaoId)) as any;
  res.forEach(async (mesa: any) => {
    carregarMesa(mesa);
  });
};

const clientesMockados = [
  {
    id: 1,
    nome: 'João',
    pessoas: 4,
    status: 'Aguardando',
  },
  {
    id: 2,
    nome: 'Paulo',
    pessoas: 3,
    status: 'Aguardando',
  },
  {
    id: 3,
    nome: 'Bianca',
    pessoas: 2,
    status: 'Aguardando',
  },
];
const conexoesMesa = [
  {
    mesaId: '4M1',
    clienteId: 1,
    cliente: {
      id: 1,
      nome: 'João',
      pessoas: 4,
      status: 'Aguardando',
    },
  },
];

const formDataSentarCliente = reactive({
  mesaId: '',
  clienteId: 0,
  cliente: {
    id: 0,
    nome: '',
    pessoas: 0,
    status: '',
  },
});
const dialogSentarCliente = ref<boolean>(false);
const handleSentarCliente = (cliente: any) => {
  dialogSentarCliente.value = true;
  formDataSentarCliente.clienteId = cliente.id;
  formDataSentarCliente.cliente = cliente;
};

const handleSentarClienteConfirm = () => {
  dialogSentarCliente.value = false;
  const mesa = mesasData.value.find(
    (mesa: any) => mesa.id === formDataSentarCliente.mesaId,
  );

  const body = {
    mesaId: formDataSentarCliente.mesaId,
    clienteId: formDataSentarCliente.clienteId,
    cliente: formDataSentarCliente.cliente,
  };

  console.log('Sentar cliente', body);

  if (mesa) {
    conexoesMesa.push({
      mesaId: mesa.id,
      clienteId: formDataSentarCliente.clienteId,
      cliente: formDataSentarCliente.cliente,
    });
  }
};

const clienteTemConexao = (clienteId: number) => {
  return conexoesMesa.find((conexao) => conexao.clienteId === clienteId);
};
const mesaTemConexao = (mesaId: string) => {
  return conexoesMesa.find((conexao) => conexao.mesaId === mesaId);
};

watch(
  () => formData.salaoId,
  () => {
    carregarLayout();
  },
);

onMounted(() => {
  getSaloes();

  grid = GridStack.init({
    float: true,
    minRow: 12,
    cellHeight: 65,
    disableResize: true,
    disableDrag: true,
  });
});
</script>

<template>
  <main class="relative flex p-4">
    <div>
      <div class="font-black">Onakagasuita</div>
      <div class="text-sm font-black text-primary-main">PAINEL OPERACIONAL</div>
    </div>
    <div class="mx-auto flex h-full gap-4">
      <div class="mx-auto h-full w-[780px] max-w-[780px]">
        <Select
          v-model="formData.salaoId"
          :options="saloesData"
          optionLabel="nome"
          optionValue="id"
          placeholder="Selecione um salão para gerenciar"
          class="mx-auto mb-4"
        />

        <div class="grid-stack">
          <div
            v-for="mesa in mesasData"
            class="grid-stack-item relative"
            :gs-x="mesa.x"
            :gs-y="mesa.y"
            :gs-w="mesa.w"
            :gs-h="mesa.h"
            :gs-id="mesa.id"
            :id="mesa.id"
            :key="mesa.id"
          >
            <!-- <div class="grid-stack-item-content"> -->
            <div class="grid h-full place-items-center p-4">
              <component
                class="mesa__component"
                :is="mesa.component"
                :mesa="mesa"
                :conexao="mesaTemConexao(mesa.id)"
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="mx-auto w-[400px] border border-surface-300 p-4 dark:border-surface-700"
      >
        <span class="mb-8">Clientes</span>

        <div v-for="cliente in clientesMockados" :key="cliente.id">
          <Divider class="my-4" />
          <div
            class="flex items-center justify-between"
            :class="{ 'text-green-500': clienteTemConexao(cliente.id) }"
          >
            <div class="flex items-center gap-2">
              <div class="flex items-center gap-2">
                <IconUser :size="16" />
                {{ cliente.pessoas }}
              </div>
              <div>{{ cliente.nome }}</div>
            </div>
            <Button
              size="small"
              :disabled="clienteTemConexao(cliente.id)"
              @click="handleSentarCliente(cliente)"
            >
              Sentar cliente
            </Button>
          </div>
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="dialogSentarCliente"
      modal
      :header="`Sentar ${formDataSentarCliente.cliente.nome} na mesa`"
      :style="{ width: '25rem' }"
    >
      <!-- select que o valor vai ser o id das mesas -->
      <Select
        v-model="formDataSentarCliente.mesaId"
        :options="mesasData"
        optionLabel="id"
        optionValue="id"
        placeholder="Selecione uma mesa"
        class="mb-4"
      />

      <Button
        @click="handleSentarClienteConfirm"
        class="my-4 block"
        variant="secondary"
        label="Confirmar"
      />
    </Dialog>
  </main>
</template>

<style lang="scss">
.mesa {
  &__container {
    @apply grid aspect-square place-items-center p-4 outline outline-1 outline-surface-300 dark:outline-surface-700;
  }

  &__component {
    @apply relative flex h-full w-full cursor-pointer items-center justify-center;
  }
}

.sidebar {
  background: rgb(215, 243, 215);
  padding: 25px 0;
  height: 100px;
  text-align: center;
}
.sidebar > .grid-stack-item,
.sidebar-item {
  width: 100px;
  height: 50px;
  border: 2px dashed green;
  text-align: center;
  line-height: 35px;
  background: rgb(192, 231, 192);
  cursor: default;
  display: inline-block;
}

.grid-stack {
  border-bottom: 1px solid;
  border-color: #d4d4d8;
  background-image: linear-gradient(#d4d4d8 1px, transparent 1px),
    linear-gradient(90deg, #d4d4d8 1px, transparent 0px);
  background-size: calc(100% / 12 + 0px) 65px;
}

.dark {
  .grid-stack {
    border-color: #3f3f46;
    background-image: linear-gradient(#3f3f46 1px, transparent 1px),
      linear-gradient(90deg, #3f3f46 1px, transparent 0px);
  }
}

.grid-stack.grid-stack-static {
  background: #eee;
}

.sidebar > .grid-stack-item,
.grid-stack-item-content {
  text-align: center;
  background-color: #18bc9c;
}
.ui-draggable-disabled.ui-resizable-disabled > .grid-stack-item-content {
  background-color: #777;
}

.grid-stack-item-removing {
  opacity: 0.5;
}
.trash {
  height: 100px;
  background: rgba(255, 0, 0, 0.1) center center
    url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjY0cHgiIGhlaWdodD0iNjRweCIgdmlld0JveD0iMCAwIDQzOC41MjkgNDM4LjUyOSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNDM4LjUyOSA0MzguNTI5OyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+CjxnPgoJPGc+CgkJPHBhdGggZD0iTTQxNy42ODksNzUuNjU0Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2OC02LjU2My0yLjU2OGgtODguMjI0TDMwMi45MTcsMjUuNDFjLTIuODU0LTcuMDQ0LTcuOTk0LTEzLjA0LTE1LjQxMy0xNy45ODkgICAgQzI4MC4wNzgsMi40NzMsMjcyLjU1NiwwLDI2NC45NDUsMGgtOTEuMzYzYy03LjYxMSwwLTE1LjEzMSwyLjQ3My0yMi41NTQsNy40MjFjLTcuNDI0LDQuOTQ5LTEyLjU2MywxMC45NDQtMTUuNDE5LDE3Ljk4OSAgICBsLTE5Ljk4NSw0Ny42NzZoLTg4LjIyYy0yLjY2NywwLTQuODUzLDAuODU5LTYuNTY3LDIuNTY4Yy0xLjcwOSwxLjcxMy0yLjU2OCwzLjkwMy0yLjU2OCw2LjU2N3YxOC4yNzQgICAgYzAsMi42NjQsMC44NTUsNC44NTQsMi41NjgsNi41NjRjMS43MTQsMS43MTIsMy45MDQsMi41NjgsNi41NjcsMi41NjhoMjcuNDA2djI3MS44YzAsMTUuODAzLDQuNDczLDI5LjI2NiwxMy40MTgsNDAuMzk4ICAgIGM4Ljk0NywxMS4xMzksMTkuNzAxLDE2LjcwMywzMi4yNjQsMTYuNzAzaDIzNy41NDJjMTIuNTY2LDAsMjMuMzE5LTUuNzU2LDMyLjI2NS0xNy4yNjhjOC45NDUtMTEuNTIsMTMuNDE1LTI1LjE3NCwxMy40MTUtNDAuOTcxICAgIFYxMDkuNjI3aDI3LjQxMWMyLjY2MiwwLDQuODUzLTAuODU2LDYuNTYzLTIuNTY4YzEuNzA4LTEuNzA5LDIuNTctMy45LDIuNTctNi41NjRWODIuMjIxICAgIEM0MjAuMjYsNzkuNTU3LDQxOS4zOTcsNzcuMzY3LDQxNy42ODksNzUuNjU0eiBNMTY5LjMwMSwzOS42NzhjMS4zMzEtMS43MTIsMi45NS0yLjc2Miw0Ljg1My0zLjE0aDkwLjUwNCAgICBjMS45MDMsMC4zODEsMy41MjUsMS40Myw0Ljg1NCwzLjE0bDEzLjcwOSwzMy40MDRIMTU1LjMxMUwxNjkuMzAxLDM5LjY3OHogTTM0Ny4xNzMsMzgwLjI5MWMwLDQuMTg2LTAuNjY0LDguMDQyLTEuOTk5LDExLjU2MSAgICBjLTEuMzM0LDMuNTE4LTIuNzE3LDYuMDg4LTQuMTQxLDcuNzA2Yy0xLjQzMSwxLjYyMi0yLjQyMywyLjQyNy0yLjk5OCwyLjQyN0gxMDAuNDkzYy0wLjU3MSwwLTEuNTY1LTAuODA1LTIuOTk2LTIuNDI3ICAgIGMtMS40MjktMS42MTgtMi44MS00LjE4OC00LjE0My03LjcwNmMtMS4zMzEtMy41MTktMS45OTctNy4zNzktMS45OTctMTEuNTYxVjEwOS42MjdoMjU1LjgxNVYzODAuMjkxeiIgZmlsbD0iI2ZmOWNhZSIvPgoJCTxwYXRoIGQ9Ik0xMzcuMDQsMzQ3LjE3MmgxOC4yNzFjMi42NjcsMCw0Ljg1OC0wLjg1NSw2LjU2Ny0yLjU2N2MxLjcwOS0xLjcxOCwyLjU2OC0zLjkwMSwyLjU2OC02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTktNC44NTMtMi41NjgtNi41NjdjLTEuNzE0LTEuNzA5LTMuODk5LTIuNTY1LTYuNTY3LTIuNTY1SDEzNy4wNGMtMi42NjcsMC00Ljg1NCwwLjg1NS02LjU2NywyLjU2NSAgICBjLTEuNzExLDEuNzE0LTIuNTY4LDMuOTA0LTIuNTY4LDYuNTY3djE2NC40NTRjMCwyLjY2OSwwLjg1NCw0Ljg1MywyLjU2OCw2LjU3QzEzMi4xODYsMzQ2LjMxNiwxMzQuMzczLDM0Ny4xNzIsMTM3LjA0LDM0Ny4xNzJ6IiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTIxMC4xMjksMzQ3LjE3MmgxOC4yNzFjMi42NjYsMCw0Ljg1Ni0wLjg1NSw2LjU2NC0yLjU2N2MxLjcxOC0xLjcxOCwyLjU2OS0zLjkwMSwyLjU2OS02LjU3VjE3My41ODEgICAgYzAtMi42NjMtMC44NTItNC44NTMtMi41NjktNi41NjdjLTEuNzA4LTEuNzA5LTMuODk4LTIuNTY1LTYuNTY0LTIuNTY1aC0xOC4yNzFjLTIuNjY0LDAtNC44NTQsMC44NTUtNi41NjcsMi41NjUgICAgYy0xLjcxNCwxLjcxNC0yLjU2OCwzLjkwNC0yLjU2OCw2LjU2N3YxNjQuNDU0YzAsMi42NjksMC44NTQsNC44NTMsMi41NjgsNi41N0MyMDUuMjc0LDM0Ni4zMTYsMjA3LjQ2NSwzNDcuMTcyLDIxMC4xMjksMzQ3LjE3MnogICAgIiBmaWxsPSIjZmY5Y2FlIi8+CgkJPHBhdGggZD0iTTI4My4yMiwzNDcuMTcyaDE4LjI2OGMyLjY2OSwwLDQuODU5LTAuODU1LDYuNTctMi41NjdjMS43MTEtMS43MTgsMi41NjItMy45MDEsMi41NjItNi41N1YxNzMuNTgxICAgIGMwLTIuNjYzLTAuODUyLTQuODUzLTIuNTYyLTYuNTY3Yy0xLjcxMS0xLjcwOS0zLjkwMS0yLjU2NS02LjU3LTIuNTY1SDI4My4yMmMtMi42NywwLTQuODUzLDAuODU1LTYuNTcxLDIuNTY1ICAgIGMtMS43MTEsMS43MTQtMi41NjYsMy45MDQtMi41NjYsNi41Njd2MTY0LjQ1NGMwLDIuNjY5LDAuODU1LDQuODUzLDIuNTY2LDYuNTdDMjc4LjM2NywzNDYuMzE2LDI4MC41NSwzNDcuMTcyLDI4My4yMiwzNDcuMTcyeiIgZmlsbD0iI2ZmOWNhZSIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=)
    no-repeat;
}

/* make nested grid have slightly darker bg take almost all space (need some to tell them apart) so items inside can have similar to external size+margin */
.grid-stack > .grid-stack-item.grid-stack-sub-grid > .grid-stack-item-content {
  background: rgba(0, 0, 0, 0.1);
  inset: 0 2px;
}
.grid-stack.grid-stack-nested {
  background: none;
  /* background-color: red; */
  /* take entire space */
  position: absolute;
  inset: 0; /* TODO change top: if you have content in nested grid */
}
</style>
