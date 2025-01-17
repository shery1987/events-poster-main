import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_URL: process.env.API_URL || 'http://localhost:3030/api',
      // posthogPublicKey: 'phc_LZxuf3gxxKB9PFXd5GxPmmwoDE96aGi83ALMS63ijpW',
      // posthogHost: 'https://eu.i.posthog.com',
    }
  },
  app: {
    head: {
      htmlAttrs: {
        dir: 'rtl',
        lang: 'he',
      },
    },
  },
  css: [
    "@/assets/styles/main.scss",
  ],
  modules: [
    "@pinia/nuxt", 
    "@nuxtjs/style-resources", 
    "@nuxt/image", 
    "nuxt-gtag"
  ],
  gtag: {
    id: "G-EMTQYKKSEY"
  },
  typescript: {
    strict: false
  }
})