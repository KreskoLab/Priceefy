import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt', '@nuxtjs/color-mode'],

	css: ['@/assets/main.css'],

	builder: 'vite',

	vueuse: {
		ssrHandlers: true,
	},

	colorMode: {
		classSuffix: '',
	},

	publicRuntimeConfig: {
		baseAPI: process.env.API_URL,
		baseImages: process.env.IMAGE_URL,
	},

	meta: {
		htmlAttrs: {
			lang: 'uk',
		},
	},
})
