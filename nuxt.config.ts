import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
	modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@vueuse/nuxt'],

	css: ['@/assets/main.css'],

	builder: 'vite',

	vueuse: {
		ssrHandlers: true,
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
