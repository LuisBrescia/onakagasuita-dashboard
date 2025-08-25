<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useBreadcrumbStore } from '@/stores/breadcrumbStore';
import { useUnidadeStore } from '@/stores/unidadeStore';
import SalaoService from '@/services/SalaoService';
import type { Salao } from '@@/types/Salao';
import { GridStack } from 'gridstack';
import type { GridItemHTMLElement, GridStackNode, GridStackElement } from 'gridstack';
// import 'gridstack/dist/gridstack.min.css';
import 'gridstack/dist/gridstack.css';
import {
  MesaPequenaCircular,
  MesaPequenaQuadrada,
  MesaGrandeRetangular,
} from '@/components/common/_index';
import { useToast } from 'primevue/usetoast';

definePageMeta({
  layout: 'admin',
  middleware: ['authenticated', 'unidade-must-selected'],
});

/** GRIDSTACK INICIO */
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

onMounted(() => {
  grid = GridStack.init({
    float: true,
    minRow: 12,
    cellHeight: 65,
    disableResize: true,
  });

  grid.on('dragstop', function (event, element: GridItemHTMLElement) {
    const node: GridStackNode | undefined = element.gridstackNode;
    info.value = `Mesa #${node?.id} movida para ${node?.x},${node?.y}.`;
  });

  grid
    .on('dragstart', (event, element: GridItemHTMLElement) => {
      element.classList.add('hovering-element');
    })
    .on('dragstop', (event, element: GridItemHTMLElement) => {
      element.classList.remove('hovering-element');
    });

  // GridStackNodesHandler
  grid.on('change', onChange);
});

function onChange(event: Event, changeItems: GridStackNode[]) {
  updateInfo();
  console.log('change', changeItems);
  // update item position
  changeItems.forEach(item => {
    const widget = mesasData.value.find(w => w.id == item.id);
    if (!widget) {
      return;
    }
    widget.x = item.x;
    widget.y = item.y;
    widget.w = item.w;
    widget.h = item.h;
  });
}

const adicionarMesa = (mesa: TipoMesa) => {
  const node = mesasData.value[count.value] || {
    x: 0,
    y: 0,
    tipo: mesa,
    disponivel_reserva: true,
    ...mesasTipo[mesa],
  };

  console.log('ADICIONAR', node);

  node.id = `${salaoData.value.id}M${count.value}`;
  count.value++;
  node.nome = 'Mesa ' + node.id;
  mesasData.value.push(node);
  nextTick(() => {
    grid?.makeWidget(node.id);
    updateInfo();
  });
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
    updateInfo();
  });
};

const mesasDataFiltrado = computed(() => {
  return mesasData.value.map(m => {
    return {
      id: m.id,
      nome: m.nome,
      tipo: m.tipo,
      disponivel_reserva: m.disponivel_reserva,
      maximo_pessoas: m.maximo_pessoas,
      minimo_pessoas: m.minimo_pessoas,
      x: m.x,
      y: m.y,
    };
  });
});

function removerMesa(widget: ItemMesa) {
  const index = mesasData.value.findIndex(w => w.id == widget.id);
  mesasData.value.splice(index, 1);
  const selector = `#${widget.id}`;
  grid?.removeWidget(selector, false);
  updateInfo();
}

const duplicarMesa = (mesa: ItemMesa) => {
  const node = { ...mesa };
  node.id = 'M' + count.value++;
  mesasData.value.push(node);
  nextTick(() => {
    grid?.makeWidget(node.id as GridStackElement);
    updateInfo();
  });
};

function updateInfo() {
  color.value = grid?.engine.nodes.length == mesasData.value.length ? 'black' : 'red';
  gridInfo.value = `Grid engine: ${grid?.engine.nodes.length}, widgets: ${mesasData.value.length}`;
}

/** GRIDSTACK FINAL */

const route = useRoute();
const breadcrumbStore = useBreadcrumbStore();

const unidadeStore = useUnidadeStore();
const unidadeNome = unidadeStore.unidade?.nome_fantasia || 'Unidade';
const salaoData = ref<Partial<Salao>>({
  id: 0,
  nome: 'Salão',
  unidade_id: 0,
});

const getLayout = async () => {
  const res = (await SalaoService.getLayout(Number(route.params.id))) as any;

  if (!res || res.length === 0) {
    return;
  }

  res.forEach((mesa: any) => {
    carregarMesa(mesa);
  });
};

getLayout();

const getSalao = async () => {
  salaoData.value = await SalaoService.get(Number(route.params.id));
  console.log('salaoData', salaoData.value);
};

const handleSubmitLoading = ref(false);
const handleSubmit = async () => {
  handleSubmitLoading.value = true;
  try {
    SalaoService.saveLayout(Number(route.params.id), mesasDataFiltrado.value);
  } catch (error) {
    console.error(error);
  } finally {
    handleSubmitLoading.value = false;
    toast.add({
      severity: 'success',
      summary: 'O layout foi salvo com sucesso.',
      life: 3000,
    });
    mesasData.value = [];
    grid?.removeAll();
    getLayout();
  }
};

onBeforeMount(async () => {
  await getSalao();
  breadcrumbStore.setBreadcrumb([
    { name: unidadeNome, to: '/admin/home/' },
    { name: 'Estrutura', to: '/admin/home/estrutura' },
    {
      name: salaoData.value.nome ?? 'Salão',
      to: `/admin/home/estrutura/${route.params.id}`,
    },
    { name: 'Layout', to: `/admin/home/estrutura/layout` },
  ]);
});
</script>

<template>
  <div class="page-content">
    <TheTopbar>
      <template #actions>
        <Button
          :label="$t('actions.back')"
          size="small"
          outlined
          icon="pi pi-arrow-left"
          severity="secondary"
          @click="navigateTo(`/admin/home/estrutura/${route.params.id}`)"
        />
        <Button
          severity="success"
          size="small"
          icon="pi pi-save"
          :label="$t('actions.save')"
          :loading="handleSubmitLoading"
          @click="handleSubmit"
        />

        <Button
          severity="warning"
          size="small"
          outlined
          icon="pi pi-refresh"
          label="Resetar"
          @click="
            () => {
              mesasData = [];
              count = 0;
              grid?.removeAll();
              updateInfo();
            }
          "
        />
      </template>
    </TheTopbar>

    <div class="flex h-full justify-center gap-4 p-4">
      <!-- * Elementos -->
      <div
        class="h-fit max-w-[300px] flex-1 rounded border border-surface-300 bg-surface-0 dark:border-surface-700 dark:bg-surface-900"
      >
        <h3 class="flex items-center justify-between p-4">Elementos</h3>

        <div class="grid grid-cols-1 xl:grid-cols-3">
          <div class="mesa__container">
            <!-- TAMANHO 1 por 1 -->
            <MesaPequenaCircularAlternativa
              class="mesa__component"
              @click="adicionarMesa('pequenaCircular')"
            />
          </div>
          <div class="mesa__container">
            <!-- TAMANHO 1 por 1 -->
            <MesaPequenaQuadradaAlternativa
              class="mesa__component"
              @click="adicionarMesa('pequenaQuadrada')"
            />
          </div>
          <div class="mesa__container">
            <!-- TAMANHO 2 por 1 -->
            <MesaGrandeRetangularAlternativa
              class="mesa__component"
              @click="adicionarMesa('grandeRetangular')"
            />
          </div>
        </div>
      </div>

      <!-- * DropZone -->
      <div
        class="h-fit max-w-[780px] flex-1 rounded border border-surface-300 bg-surface-0 dark:border-surface-700 dark:bg-surface-900"
      >
        <div class="grid-stack">
          <div
            v-for="mesa in mesasData"
            :id="mesa.id"
            :key="mesa.id"
            class="grid-stack-item relative"
            :gs-x="mesa.x"
            :gs-y="mesa.y"
            :gs-w="mesa.w"
            :gs-h="mesa.h"
            :gs-id="mesa.id"
          >
            <!-- <div class="grid-stack-item-content"> -->
            <div class="grid h-full place-items-center p-4">
              <component
                :is="mesa.component"
                class="mesa__component"
                :mesa="mesa"
                @duplicate="duplicarMesa(mesa)"
                @delete="removerMesa(mesa)"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
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
  background-image:
    linear-gradient(#d4d4d8 1px, transparent 1px),
    linear-gradient(90deg, #d4d4d8 1px, transparent 0px);
  background-size: calc(100% / 12 + 0px) 65px;
}

.dark {
  .grid-stack {
    border-color: #3f3f46;
    background-image:
      linear-gradient(#3f3f46 1px, transparent 1px),
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

.grid-stack-placeholder > .placeholder-content {
  border-radius: 0.5rem;
}

.dark {
  .grid-stack-placeholder > .placeholder-content {
    background-color: oklch(44.2% 0.017 285.786);
    opacity: 0.25;
  }
}
</style>
