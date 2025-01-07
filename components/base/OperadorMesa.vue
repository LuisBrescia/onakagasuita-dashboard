<script lang="ts" setup>
const handleCellClick = () => {
  console.log('MesaGrandeRetangular clicked');
};

const props = defineProps<{
  mesa: any;
  conexao: any;
  numCadeiras: number;
  maximoMesa: number;
  styles: any;
}>();

const emits = defineEmits<{
  (e: 'delete', mesa: any): void;
  (e: 'duplicate', mesa: any): void;
}>();

const menu = ref();
// MenuItem[]
const items = ref<any[]>([
  {
    label: 'Editar',
    icon: 'pi pi-pencil',
    command: () => (editDrawer.value = true),
  },
  {
    label: 'Duplicar',
    icon: 'pi pi-copy',
    command: () => emits('duplicate', props.mesa),
  },
  {
    separator: true,
  },
  {
    label: 'Apagar',
    icon: 'pi pi-trash',
    command: () => emits('delete', props.mesa),
  },
]);

const onImageRightClick = (event: Event) => {
  menu.value.show(event);
};

const editDrawer = ref(false);
</script>

<template>
  <div :class="{ 'mesa-conectada': conexao }">
    <div
      class="c-drag-element--general relative"
      :class="styles['c-drag-element']"
      :style="{ opacity: mesa.disponivel_reserva ? 1 : 0.5 }"
      @contextmenu="onImageRightClick"
      @click="handleCellClick"
      @dblclick="editDrawer = true"
    >
      <div
        v-for="(_, idx) in numCadeiras"
        :key="idx"
        class="c-drag-element-chair"
        :class="styles['c-drag-element__chair']"
      />
      <div
        class="c-drag-element__fill"
        :class="styles['c-drag-element__fill']"
      />

      <div class="c-drag-element__name">
        <p class="mb-1 text-center">
          {{ conexao ? conexao.cliente.nome : mesa.nome }}
        </p>

        <div class="flex justify-center">
          <IconUser :size="14" />
          <span v-if="conexao" class="ms-1 text-xs">
            {{ conexao.cliente.pessoas }}
          </span>
          <span v-else class="ms-1 text-xs">
            {{ mesa.minimo_pessoas }} - {{ mesa.maximo_pessoas }}
          </span>
        </div>
      </div>
    </div>

    <ContextMenu ref="menu" :model="items" />
    <Drawer v-model:visible="editDrawer" header="Propriedades" position="right">
      <div class="flex items-center justify-between px-4">
        <span class="text-nowrap text-sm">Nome da mesa</span>
        <InputText size="small" class="w-24 text-center" v-model="mesa.nome" />
      </div>

      <Divider />

      <div class="mb-4 flex items-center justify-between px-4">
        <span class="text-nowrap text-sm">Mínimo de pessoas</span>
        <div class="w-24">
          <InputNumber
            v-model="mesa.minimo_pessoas"
            fluid
            showButtons
            :min="1"
            :max="mesa.maximo_pessoas"
          >
            <template #incrementbuttonicon>
              <IconPlus :size="16" />
            </template>
            <template #decrementbuttonicon>
              <IconMinus :size="16" />
            </template>
          </InputNumber>
        </div>
      </div>

      <div class="flex items-center justify-between px-4">
        <span class="text-nowrap text-sm">Máximo de pessoas</span>
        <div class="w-24">
          <InputNumber
            v-model="mesa.maximo_pessoas"
            fluid
            showButtons
            :min="mesa.minimo_pessoas"
            :max="maximoMesa"
          >
            <template #incrementbuttonicon>
              <IconPlus :size="16" />
            </template>
            <template #decrementbuttonicon>
              <IconMinus :size="16" />
            </template>
          </InputNumber>
        </div>
      </div>

      <Divider />

      <div class="flex items-center justify-between px-4">
        <span class="text-nowrap text-sm">Disponível para reservas</span>
        <div class="w-24 text-center">
          <ToggleSwitch name="activation" v-model="mesa.disponivel_reserva" />
        </div>
      </div>
    </Drawer>
  </div>
</template>

<style lang="scss">
.dark {
  .c-drag-element--general {
    filter: drop-shadow(2px 0px 0px white) drop-shadow(-2px 0px 0px white)
      drop-shadow(0px 2px 0px white) drop-shadow(0px -2px 0px white);
  }
}

.c-drag-element--general {
  &:hover {
    filter: drop-shadow(2px 0px 0px #0ea5e9) drop-shadow(-2px 0px 0px #0ea5e9)
      drop-shadow(0px 2px 0px #0ea5e9) drop-shadow(0px -2px 0px #0ea5e9);
  }
}

.c-drag-element__fill {
  @apply bg-green-400 dark:bg-green-700;
}

.c-drag-element-chair {
  @apply bg-green-300 dark:bg-green-800;
}

.mesa-conectada {
  .c-drag-element__fill {
    @apply bg-red-400 dark:bg-red-700;
  }
  .c-drag-element-chair {
    @apply bg-red-300 dark:bg-red-800;
  }
}

.c-drag-element__name {
  color: white;
  position: absolute;
  font-size: 0.69rem;
  line-height: 1rem;
  z-index: 11;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
