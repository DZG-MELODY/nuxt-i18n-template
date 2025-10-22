import {locales} from './i18n/locales'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxt/content'
  ],
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    langDir: 'locales',
    locales: [...locales],
  },
  // 启用 source maps 以支持调试
  sourcemap: {
    server: true,
    client: true
  },
  // 开发模式配置
  vite: {
    build: {
      sourcemap: true
    }
  }
})