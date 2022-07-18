<script setup lang="ts">
import { Product } from '~/models/product'

const { slug } = useCityCookie()
const router = useRouter()
const config = useRuntimeConfig()

const search = ref<HTMLElement | null>(null)
const products = ref<Product[]>([])
const query = ref<string>('')
const loading = ref<boolean>(false)
const active = ref<boolean>(false)

watch(query, async () => {
	await searchProducts()
})

async function searchProducts() {
	loading.value = true

	products.value = await $fetch<Product[]>(`/products/search?q=${query.value}&city=${slug}`, {
		baseURL: config.baseAPI,
	}).then(res => res.splice(0, 10))

	loading.value = false
}

function eventHandler(event: KeyboardEvent) {
	if (event.key === '/') search.value.focus()

	if (event.key === 'Escape') search.value.blur()

	if (event.key === 'Enter') {
		router.push(`/search?q=${query.value}`)
	}
}

onMounted(() => {
	window.addEventListener('keyup', eventHandler)
})

onUnmounted(() => window.removeEventListener('keyup', eventHandler))
</script>

<template>
	<div class="relative w-full">
		<div class="relative w-full">
			<input
				@focus="active = true"
				@focusout="active = false"
				v-model="query"
				placeholder="Пошук"
				ref="search"
				class="appearance-none outline-none rounded-md dark:bg-slate-700/70 bg-gray-200/70 w-full h-10 px-10 focus:ring-2 dark:focus:ring-slate-700/50 focus:ring-gray-200/50 transition duration-200 ease-in-out dark:text-slate-300 text-gray-800 dark:caret-slate-50"
			/>

			<svg
				class="h-6 w-6 absolute inset-2 dark:text-slate-400 text-gray-500"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				stroke-width="2"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
				/>
			</svg>

			<span
				class="hidden sm:inline absolute right-2 dark:bg-slate-700/50 my-2 px-2 rounded-md shadow dark:text-slate-400 text-gray-500"
			>
				/
			</span>
		</div>

		<SearchResults
			v-if="active && query.length"
			:results="products"
			:loading="loading"
		/>

		<div
			v-if="active && query.length"
			class="overlay w-full h-screen !top-32 lg:!top-16"
		/>
	</div>
</template>

<style scoped>
.overlay {
	position: fixed;
	z-index: 3;
	inset: 110px 0px 0px;
	background-color: rgb(16, 15, 15);
	opacity: 0.45;
}
</style>
