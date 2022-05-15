<template>
	<article
		class="flex flex-col space-y-12 w-full h-full min-w-[320px] dark:bg-slate-800 bg-white outline outline-2 dark:outline-slate-700 outline-gray-200 border-4 border-transparent rounded-md hover:border-teal-400 hover:outline-transparent transition duration-200 ease-in-out py-5 px-4"
	>
		<div class="flex space-x-6">
			<div
				class="flex justify-center items-center shrink-0 w-24 h-24 dark:bg-slate-700/90 rounded-md"
			>
				<img
					class="h-16 w-16"
					:src="`${config.baseImages}/products/${product.image}?width=128&height=128`"
					:alt="product.name"
				/>
			</div>

			<div class="flex flex-col space-y-2 pt-0.5 dark:text-slate-200 text-gray-800">
				<h2 class="text-sm line-clamp-3">{{ normalName }}</h2>
				<span class="w-max dark:bg-teal-600/40 bg-teal-200/80 rounded px-2 tracking-wider">
					{{ normalPrice }}
				</span>
			</div>
		</div>

		<div class="flex space-x-6 items-center text-sm dark:text-slate-400 text-gray-500">
			<div class="flex min-w-max items-center space-x-2">
				<svg
					class="h-5 w-5"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
					stroke-width="2"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
					/>
				</svg>
				<span>{{ normalWeight }}</span>
			</div>

			<div class="flex items-center space-x-2 overflow-hidden">
				<svg
					class="w-5 h-5 mt-1"
					fill="currentColor"
					viewBox="0 0 16 16"
				>
					<path
						d="M5.295 11V5.995H7V5H2.403v.994h1.701V11h1.19zm3.397 0V7.01h.058l1.428 3.239h.773l1.42-3.24h.057V11H13.5V5.001h-1.2l-1.71 3.894h-.039l-1.71-3.894H7.634V11h1.06z"
					/>
					<path
						d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h12zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"
					/>
				</svg>
				<span class="line-clamp-1 text-ellipsis">{{ product.trademark }}</span>
			</div>
		</div>
	</article>
</template>

<script
	setup
	lang="ts"
>
import type { Product } from '@/models/product'

const config = useRuntimeConfig()

const props = defineProps<{
	product: Product
}>()

const normalWeight = computed(() => useHandleWeight(props.product.weight, props.product.unit))

const normalPrice = computed(() => {
	const prices = props.product.prices.map(item => item.price)
	if (prices.length > 1) {
		return `₴ ${Math.min(...prices).toFixed(2)} - ₴ ${Math.max(...prices).toFixed(2)}`
	} else {
		return `₴ ${prices[0].toFixed(2)}`
	}
})

const normalName = computed(() => {
	if (props.product.unit === 'ml') {
		return String(props.product.weight).length === 4
			? `${props.product.name} ${props.product.weight / 1000}л`
			: `${props.product.name} ${props.product.weight}мл`
	} else {
		return props.product.name
	}
})
</script>
