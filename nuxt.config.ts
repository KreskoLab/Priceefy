import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/color-mode'],

	css: ['@/assets/main.css'],

	builder: 'vite',

	ssr: true,

	vueuse: {
		ssrHandlers: true,
	},

	colorMode: {
		classSuffix: '',
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
})
