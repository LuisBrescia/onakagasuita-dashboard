<script setup lang="ts">
import type { SupportedLanguages } from '@@/i18n/SupportedLanguages';
import FlagEN from '@/assets/flags/en.svg';
import FlagFR from '@/assets/flags/fr.svg';
import FlagJP from '@/assets/flags/jp.svg';
import FlagPT from '@/assets/flags/pt.svg';

type Tema = 'system' | 'light' | 'dark';

const colorMode = useColorMode();
const selectTemaPopover = ref();

const handleSelectTemaPopover = (event: Event): void => {
  selectTemaPopover.value.toggle(event);
};

const temaOptions: Tema[] = ['system', 'light', 'dark'];

const { locale, setLocale } = useTranslate();
const selectedLocale = ref(locale.value);

const selectLanguagePopover = ref();

const handleSelectLanguagePopover = (event: Event): void => {
  selectLanguagePopover.value.toggle(event);
};

const handleLocaleChange = (languageCode: SupportedLanguages) => {
  setLocale(languageCode);
  selectedLocale.value = languageCode;
};

const mapFlags: Record<SupportedLanguages, string> = {
  en: FlagEN,
  fr: FlagFR,
  jp: FlagJP,
  pt: FlagPT,
};

const mapLanguages: Record<SupportedLanguages, string> = {
  en: 'English',
  fr: 'Français',
  jp: '日本語',
  pt: 'Português',
};
</script>

<template>
  <Dialog
    modal
    class="w-[32rem]"
    :header="$t('settings.header')"
    :draggable="false"
    :pt="{
      header: {
        class: 'border-b border-surface-300 dark:border-surface-700',
      },
    }"
  >
    <div class="flex flex-col gap-4">
      <div class="flex items-center justify-between">
        <span class="text-sm">{{ $t('settings.theme') }}</span>
        <div
          class="flex cursor-pointer items-center gap-1 pe-2 text-sm"
          @click="handleSelectTemaPopover"
        >
          <span>{{ $t(`settings.themeOptions.${colorMode.preference}`) }}</span>
          <IconChevronDown :size="16" class="text-surface-500 dark:text-surface-400" />
        </div>
      </div>

      <div class="flex items-center justify-between">
        <span class="text-sm">{{ $t('settings.language') }}</span>
        <div
          class="flex cursor-pointer items-center gap-1 pe-2 text-sm"
          @click="handleSelectLanguagePopover"
        >
          <span>{{ mapLanguages[selectedLocale as SupportedLanguages] }}</span>
          <IconChevronDown :size="16" class="text-surface-500 dark:text-surface-400" />
        </div>
      </div>
    </div>

    <!-- * Escolha de tema -->
    <Popover
      ref="selectTemaPopover"
      unstyled
      class="rounded-custom mt-2 border border-surface-300 bg-surface-0 py-2 shadow-lg dark:border-surface-700 dark:bg-surface-900"
    >
      <div class="flex w-[8rem] flex-col text-sm">
        <div
          v-for="option in temaOptions"
          :key="option"
          class="interativo flex cursor-pointer items-center justify-between px-3 py-2 text-xs"
          @click="colorMode.preference = option"
        >
          <span class="text-sm">{{ $t(`settings.themeOptions.${option}`) }}</span>
          <IconCheck v-if="colorMode.preference === option" :size="16" />
        </div>
      </div>
    </Popover>

    <!-- * Escolha de linguagem -->
    <Popover
      ref="selectLanguagePopover"
      unstyled
      class="rounded-custom mt-2 border border-surface-300 bg-surface-0 py-2 shadow-lg dark:border-surface-700 dark:bg-surface-900"
    >
      <div class="flex w-[10rem] flex-col text-sm">
        <div
          v-for="(label, code) in mapLanguages"
          :key="code"
          class="interativo flex cursor-pointer items-center justify-between px-3 py-2 text-xs"
          @click="handleLocaleChange(code)"
        >
          <div class="flex">
            <img :alt="label" :src="mapFlags[code]" class="mr-2" style="width: 18px" />
            <span class="text-sm">{{ label }}</span>
          </div>
          <IconCheck v-if="selectedLocale === code" :size="16" />
        </div>
      </div>
    </Popover>
  </Dialog>
</template>
