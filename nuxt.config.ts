import { defineNuxtConfig } from 'nuxt'
import UnpluginComponentsVite from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'

export default defineNuxtConfig({
	modules: [
		'@nuxtjs/tailwindcss',
		'@pinia/nuxt',
		'@vueuse/nuxt',
		'@nuxtjs/color-mode',
		'unplugin-icons/nuxt',
		'@nuxt/image-edge',
	],

	css: ['@/assets/main.css'],

	builder: 'vite',

	srcDir: 'src/',

	vueuse: {
		ssrHandlers: true,
	},

	colorMode: {
		classSuffix: '',
	},

	vite: {
		plugins: [
			UnpluginComponentsVite({
				dts: false,
				resolvers: [
					IconsResolver({
						prefix: 'Icon',
					}),
				],
			}),
		],
	},

	image: {
		// domains: ['img2.zakaz.ua', 'img3.zakaz.ua', 'content.silpo.ua'],
	},

	publicRuntimeConfig: {
		baseAPI: process.env.API_URL,
		domain: process.env.DOMAIN,
	},

	meta: {
		htmlAttrs: {
			lang: 'uk',
		},

		titleTemplate: '%s - Priceefy',
	},

	build: {
		transpile: ['chart.js'],
	},
})
