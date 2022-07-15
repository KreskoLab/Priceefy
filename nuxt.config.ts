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

	ssr: true,

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

	publicRuntimeConfig: {
		baseAPI: process.env.API_URL,
		baseImages: process.env.IMAGE_URL,
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
