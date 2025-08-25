import type { SupportedLanguages } from '@@/i18n/SupportedLanguages';
import en from '@/config/locales/en.json';
import fr from '@/config/locales/fr.json';
import jp from '@/config/locales/jp.json';
import pt from '@/config/locales/pt.json';
import type { PrimeVueLocaleOptions } from 'primevue';

const primevueLocales: Record<SupportedLanguages, PrimeVueLocaleOptions> = {
  en,
  fr,
  jp,
  pt,
};

export const useTranslate = () => {
  const i18n = useI18n();
  const PrimeVue = usePrimeVue();

  const setLocale = (locale: SupportedLanguages) => {
    i18n.setLocale(locale);

    if (primevueLocales[locale]) {
      PrimeVue.config.locale = primevueLocales[locale];
    } else {
      console.warn(`Idioma "${locale}" não encontrado nas traduções do PrimeVue`);
    }
  };

  return {
    ...i18n,
    setLocale,
  };
};
