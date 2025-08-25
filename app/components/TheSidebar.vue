<script setup>
import {
  Home,
  Workflow,
  Tag as TagIcon,
  Wallet,
  HeartPulse,
  Store,
  Clock,
  BookOpen,
  UsersRound,
  Pickaxe,
} from 'lucide-vue-next';
import { useViewWrapperStore } from '@/stores/viewWrapperStore';
import { useUsuarioStore } from '@/stores/usuarioStore';
import { useUnidadeStore } from '@/stores/unidadeStore';

const emits = defineEmits(['unidade-selected']);
const localePath = useLocalePath();

const itemsSidebar = computed(() => ({
  admin: [
    {
      icon: Home,
      label: $t('pages.admin.home'),
      to: localePath('/admin/home'),
    },
    {
      icon: Workflow,
      label: $t('pages.admin.integrations'),
      to: localePath('/admin/home/integracoes'),
      disabled: true,
    },
    {
      icon: TagIcon,
      label: $t('pages.admin.voucher'),
      to: localePath('/admin/home/vouchers'),
      disabled: true,
    },
    {
      icon: Wallet,
      label: $t('pages.admin.financial'),
      to: localePath('/admin/home/financeiro'),
      disabled: true,
    },
    {
      icon: HeartPulse,
      label: $t('pages.admin.benefits_plans'),
      to: localePath('/admin/home/planos'),
      disabled: true,
    },
  ],
  user: [
    {
      icon: Store,
      label: $t('pages.structure'),
      to: localePath('/admin/home/estrutura'),
    },
    {
      icon: Clock,
      label: $t('pages.schedules'),
      to: localePath('/admin/home/horarios'),
      disabled: true,
    },
    {
      icon: BookOpen,
      label: $t('pages.business'),
      to: localePath('/admin/home/regras'),
      disabled: true,
    },
    {
      icon: Pickaxe,
      label: $t('pages.operators'),
      to: localePath('/admin/home/operadores'),
    },
    {
      icon: UsersRound,
      label: $t('pages.clients'),
      to: localePath('/admin/home/clientes'),
    },
  ],
}));
const nextChangeIcon = {
  'pi-arrow-left': 'pi-arrow-right',
  'pi-arrow-right': 'pi-arrow-left',
};

const route = useRoute();

const usuarioStore = useUsuarioStore();
const unidadeStore = useUnidadeStore();
const viewWrapperStore = useViewWrapperStore();

const dialogConfirmarSaida = ref(false);
const dialogConfiguracoes = ref(false);
const popoverDadosPerfil = ref();
const panelStatusIcon = ref(viewWrapperStore.sidebarOpen ? 'pi-arrow-left' : 'pi-arrow-right');

const openPerfilPopover = event => {
  popoverDadosPerfil.value.toggle(event);
};

const handlePanelChange = () => {
  panelStatusIcon.value = nextChangeIcon[panelStatusIcon.value];
  viewWrapperStore.toggleSidebar();
};

const handleLogout = async () => {
  await usuarioStore.logout();
  navigateTo('/admin/login');
};
</script>

<template>
  <aside class="c-sidebar" :class="{ 'is-open': viewWrapperStore.sidebarOpen }">
    <div class="c-sidebar__header">
      <h2 class="c-sidebar__header__branding">
        <IconReceiptJapaneseYen class="text-primary-main" :size="20" />
        <span class="text-base">Onakagasuita</span>
      </h2>

      <div class="c-sidebar__header__panel-switch">
        <Button
          class="rounded-custom p-1"
          text
          severity="secondary"
          size="small"
          @click="handlePanelChange"
        >
          <IconPanelLeftClose
            v-if="panelStatusIcon === 'pi-arrow-left'"
            :stroke-width="1.5"
            :size="20"
          />
          <IconPanelLeftOpen v-else :stroke-width="1.5" :size="20" />
        </Button>
      </div>
    </div>

    <div class="c-sidebar__body">
      <h4 class="c-sidebar__body__header mb-2 px-4">Admin</h4>

      <template v-for="item in itemsSidebar.admin" :key="item">
        <NuxtLink v-if="!item.disabled" :to="item.to">
          <div class="c-sidebar__item px-4 py-2">
            <component :is="item.icon" :size="16" />
            <span class="ml-2 text-nowrap">{{ item.label }}</span>
          </div>
        </NuxtLink>
        <div
          v-else
          class="c-sidebar__item flex justify-between px-4 py-2"
          style="cursor: not-allowed !important; opacity: 0.5"
        >
          <component :is="item.icon" :size="16" />
          <span class="ml-2 text-nowrap">{{ item.label }}</span>
        </div>
      </template>

      <div class="my-2 h-[1px] bg-surface-300 dark:bg-surface-700" />

      <h4 class="c-sidebar__body__header mb-2 px-4">Específicos de unidade</h4>

      <SelectUnidade @unidade-selected="emits('unidade-selected')" />

      <span :class="!unidadeStore.unidade ? 'pointer-events-none opacity-50' : ''">
        <template v-for="item in itemsSidebar.user" :key="item">
          <NuxtLink v-if="!item.disabled" :to="item.to">
            <div
              class="c-sidebar__item px-4 py-2"
              :class="{ 'is-active': route.path.startsWith(item.to) }"
            >
              <component :is="item.icon" :size="16" />
              <span class="ml-2 text-nowrap">{{ item.label }}</span>
            </div>
          </NuxtLink>
          <div
            v-else
            class="c-sidebar__item flex justify-between px-4 py-2"
            style="cursor: not-allowed !important; opacity: 0.5"
          >
            <component :is="item.icon" :size="16" />
            <span class="ml-2 text-nowrap">{{ item.label }}</span>
          </div>
        </template>
      </span>
    </div>

    <div class="c-sidebar__item p-3" @click="openPerfilPopover">
      <div class="flex items-center gap-2">
        <AppAvatar v-if="usuarioStore.user.nome" :letra="usuarioStore.user.nome[0]" />
        <Skeleton v-else shape="circle" size="1.6rem" />
        <span class="!ml-2">{{ usuarioStore.user.nome }}</span>
      </div>

      <IconChevronUp
        :size="16"
        class="right-4 text-surface-600 dark:text-surface-300"
        sidebar-behavior="hidden"
      />
    </div>
  </aside>

  <Popover
    ref="popoverDadosPerfil"
    unstyled
    class="mt-1 border border-surface-300 bg-surface-0 py-2 shadow-lg dark:border-surface-700 dark:bg-surface-900"
    :pt="{
      root: {
        style: {
          marginLeft: '9px',
        },
      },
    }"
  >
    <div class="flex w-[16.8rem] flex-col text-sm">
      <div class="py-4 text-center">
        <AppAvatar v-if="usuarioStore.user.nome" size="xlarge" :letra="usuarioStore.user.nome[0]" />
        <Skeleton v-else shape="circle" size="3.2rem" class="mx-auto" />
        <div class="mt-2">
          <h4 class="mb-1 text-sm dark:text-surface-0">
            {{ usuarioStore.user.nome }}
          </h4>
          <p class="text-xs dark:text-surface-300">
            {{ usuarioStore.user.email }}
          </p>
        </div>
      </div>

      <div class="interativo flex cursor-pointer items-center justify-between px-6 py-3 text-xs">
        <div class="flex items-center">
          <IconCircleUserRound :size="16" />
          <span class="ml-4">{{ $t('profile.header') }}</span>
        </div>
        <Tag
          class="capitalize"
          :value="usuarioStore.user.tipo"
          :pt="{
            label: 'text-[10px]',
          }"
        />
      </div>

      <div
        class="interativo flex cursor-pointer items-center px-6 py-3 text-xs"
        @click="dialogConfiguracoes = true"
      >
        <IconSettings :size="16" />
        <span class="ml-4">{{ $t('profile.settings') }}</span>
      </div>

      <div class="my-2 h-[1px] bg-surface-300 dark:bg-surface-700" />

      <div
        class="interativo flex cursor-pointer items-center px-6 py-3 text-xs text-red-500 dark:text-red-400"
        @click="dialogConfirmarSaida = true"
      >
        <IconLogOut :size="16" />
        <span class="ml-4">{{ $t('profile.logout') }}</span>
      </div>
    </div>
  </Popover>

  <Dialog
    v-model:visible="dialogConfirmarSaida"
    modal
    class="w-[24rem]"
    header="Sair do sistema?"
    :draggable="false"
  >
    <div class="text-sm">
      <p>Um novo login será necessário para ser reconectado.</p>
    </div>
    <div class="mt-4 flex justify-end gap-2">
      <Button
        text
        label="Cancelar"
        size="small"
        severity="secondary"
        @click="dialogConfirmarSaida = false"
      />
      <Button label="Confirmar" size="small" severity="danger" @click="handleLogout" />
    </div>
  </Dialog>

  <ModalConfiguracoes v-model:visible="dialogConfiguracoes" />
</template>

<style lang="scss" scoped>
.c-sidebar {
  @apply flex flex-col border-r border-surface-300 bg-surface-0 text-xs dark:border-surface-700 dark:bg-surface-900;

  width: 49px;
  transition: width 0.3s ease-in-out;
  overflow: hidden;

  &__header {
    @apply flex justify-between px-4 py-2;
    position: relative;

    &__branding {
      @apply flex items-center gap-1 font-semibold;
      position: relative;
      top: 8px;
      text-wrap: nowrap;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }

    &__panel-switch {
      position: absolute;
      top: 14px;
      right: 8px;
    }
  }

  &__body {
    @apply flex-1 py-4;
    &__header {
      @apply text-nowrap;
      opacity: 0;
      height: 0;
      transition:
        opacity 0.3s ease-in-out,
        height 0.3s ease-in-out;
    }
  }

  &__item {
    @apply flex cursor-pointer items-center text-xs hover:bg-surface-100 active:bg-surface-200 dark:hover:bg-surface-800 dark:active:bg-surface-700;
    position: relative;

    & svg {
      @apply opacity-75;
      position: absolute;
    }

    & span {
      @apply ml-8;
    }

    & span,
    & [sidebar-behavior='hidden'] {
      @apply opacity-0;
      transition: opacity 0.3s ease-in-out;
    }
  }

  &.is-open {
    width: 18rem;

    .c-sidebar__header {
      &__branding {
        opacity: 1;
      }
    }

    .c-sidebar__body {
      &__header {
        @apply font-semibold;
        opacity: 1;
        height: 1rem;
      }
    }

    .c-sidebar__item {
      & span,
      & [sidebar-behavior='hidden'] {
        opacity: 1;
      }
    }
  }
}

.router-link-active .c-sidebar__item,
.c-sidebar__item.is-active,
.router-link-active:hover .c-sidebar__item {
  @apply bg-primary-subtle-light text-surface-900 outline-primary-main dark:bg-primary-subtle dark:text-surface-0;
  box-shadow: inset 4px 0 0 0 #ffc239;

  svg {
    @apply opacity-100;
  }
}
</style>
