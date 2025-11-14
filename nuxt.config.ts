// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['./app/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: [
    '@nuxt/fonts',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxt/eslint',
    'nuxtjs-naive-ui'
  ],
  devServer: {
    port: 3000
  },
  runtimeConfig: {
    public: {
      API_URL: 'http://localhost:8080'
    }
  },

  ssr: false,
})