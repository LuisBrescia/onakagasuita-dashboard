export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  ssr: false,
  runtimeConfig: {
    public: {
      baseURL: process.env.BASE_URL || 'http://localhost',
    },
  },
  css: ['primeicons/primeicons.css', '@/assets/css/main.css'],
  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    'nuxt-lucide-icons',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate',
  ],
  build: {
    transpile: ['primevue'],
  },
  components: [
    { path: '@/components/app', prefix: 'App' },
    { path: '@/components/base', prefix: 'Base' },
    { path: '@/components/common', prefix: '' },
    { path: '@/components/partials', prefix: '' },
    { path: '@/components', prefix: '' },
  ],

  colorMode: {
    preference: 'system',
    fallback: 'light',
    classPrefix: '',
    classSuffix: '',
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'English', file: 'en.json' },
      { code: 'fr', language: 'Français', file: 'fr.json' },
      { code: 'jp', language: '日本語', file: 'jp.json' },
      { code: 'pt', language: 'Português', file: 'pt.json' },
    ],
  },
  tailwindcss: {
    cssPath: ['@/assets/css/main.css', { injectPosition: 0 }],
    configPath: '@/tailwind.config.ts',
    exposeConfig: false,
    viewer: true,
  },
  primevue: {
    importTheme: { from: '@/config/themes/Brescia.js' },
  },
  lucide: {
    namePrefix: 'Icon',
  },
});
