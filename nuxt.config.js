import { i18n } from "./utils";
import { resolve } from "path";

// const JavaScriptObfuscator = require('webpack-obfuscator');

export default {
  ssr: false,

  env: {
    website: process.env.WEBSITE || "http://localhost:3000",
    baseUrl: process.env.BASE_URL || "http://localhost:4000/",
  },

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "TheBookStore",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [
      {
        rel: "icon",
        type: "image/x-icon",
        href: "/favicon.ico",
        crossorigin: "anonymous",
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["~/assets/scss/default.scss"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    "~/plugins/enum",
    "~/plugins/axios",
    "~/plugins/filter",
    "~/plugins/resolve",
    "~/plugins/service",
    "~/plugins/grater-vue",
    "~/plugins/vuex-persist.client",
  ],

  pageTransition: "page",

  loading: { color: "white" },

  loadingIndicator: {
    name: "circle",
    color: "black",
    background: "white",
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: false,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: ["nuxt-i18n", "@nuxtjs/axios", "@nuxtjs/auth-next"],

  axios: {
    // proxy: true,
    progress: false,
    baseUrl: process.env.BASE_URL || "http://localhost:4000/",
  },

  auth: {
    plugins: [
      "~/plugins/service.ts",
      { src: "~/plugins/axios.ts", ssr: false },
    ],
    redirect: {
      login: "/sign_in",
      // home: "/",
      logout: "/",
      callback: "/sign_in",
    },
    // resetOnError: true,
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          required: true,
          property: "accessToken",
        },
        refreshToken: {
          data: "refreshToken",
          property: "refreshToken",
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          refresh: { url: "/auth/refresh", method: "post" },
          user: { url: "/auth/user", method: "get" },
          logout: false,
        },
      },
    },
    watchLoggedIn: true,
  },

  alias: {
    utils: resolve(__dirname, "./utils"),
    scss: resolve(__dirname, "./assets/scss"),
  },

  i18n: {
    seo: true,
    lazy: true,
    langDir: "~/locales/",
    parsePages: false,
    vueI18nLoader: true,
    locales: [
      { code: "en-CA", iso: "en-CA", name: "English", file: "en-CA.json" },
      { code: "pt-BR", iso: "pt-BR", name: "Portuguese", file: "pt-BR.json" },
    ],
    vueI18n: i18n,
    defaultLocale: "en-CA",
    strategy: "prefix_and_default",
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: "i18n_redirected",
      redirectOn: "root",
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
