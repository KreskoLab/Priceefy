export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Skiku - ціни та акції на продукти онлайн',
    htmlAttrs: {
      lang: 'uk'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'theme-color', content: '#FFFFFF' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Моніторинг цін та акцій онлайн у супермаркетах Ашан, Сільпо, Новус, Метро, Еко маркет, Варус.' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/main.scss',
    '@/assets/materialdesignicons.css'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/buefy'
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    '@nuxt/image',
    '@nuxtjs/sitemap',
    'cookie-universal-nuxt'
  ],

  axios: {
    proxy: true
  },

  proxy: {
    '/zakaz/': { target: 'https://stores-api.zakaz.ua/', pathRewrite: {'^/zakaz/': ''}, changeOrigin: true },
    '/silpo/': { target: 'https://api.catalog.ecom.silpo.ua/', pathRewrite: {'^/silpo/': ''}, changeOrigin: true }
  },

  sitemap: {
    hostname: 'https://skiku.online',
    gzip: true,
    defaults: {
      changefreq: 'daily',
      priority: 1,
      lastmod: new Date()
    },
    routes: [
      ''
    ]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
