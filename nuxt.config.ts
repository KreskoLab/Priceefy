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
		baseAPI: 'https://priceefy-backend.herokuapp.com',
		baseImages: 'https://images.priceefy.com/image',
	},

	meta: {
		htmlAttrs: {
			lang: 'uk',
		},
	},
})
