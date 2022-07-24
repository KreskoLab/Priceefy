<script setup lang="ts">
import type { Product } from '@/models/product'

const props = defineProps<{
	product: Product
}>()

const normalWeight = computed<string>(() =>
	useHandleWeight(props.product.weight, props.product.unit)
)

const isDiscount = computed<boolean>(() => props.product.prices.some(price => price.discount))
const normalPrice = computed(() => useHandlePrice(props.product.prices))

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

<template>
	<article
		class="flex flex-col space-y-12 min-w-[320px] dark:bg-slate-800 bg-white outline outline-2 dark:outline-slate-700 outline-gray-200 border-4 border-transparent rounded-md hover:border-teal-400 hover:outline-0 transition duration-200 ease-in-out pt-4 pb-2 px-4"
	>
		<div class="flex space-x-6">
			<div
				class="flex justify-center items-center shrink-0 w-24 h-24 dark:bg-slate-700/90 rounded-md"
			>
				<nuxt-img
					:src="product.image"
					:alt="product.name"
					quality="80"
					loading="lazy"
					width="128"
					height="128"
					format="webp"
				/>
			</div>

			<div class="flex flex-col space-y-2 pt-0.5 dark:text-slate-200 text-gray-800">
				<h2 class="text-sm break-words line-clamp-3">{{ normalName }}</h2>

				<span
					class="w-max dark:bg-teal-600/40 bg-teal-200/80 rounded px-2 tracking-wider"
					:class="{ 'bg-red-200/80 dark:bg-red-500/80': isDiscount }"
				>
					{{ normalPrice }}
				</span>
			</div>
		</div>

		<div class="flex space-x-6 items-center text-sm dark:text-slate-400 text-gray-500">
			<div class="flex min-w-max items-center space-x-2">
				<IconMdiWeight class="text-lg" />
				<span>{{ normalWeight }}</span>
			</div>

			<div class="flex items-center space-x-2 overflow-hidden">
				<IconMdiTrademark class="w-6 h-6 mt-0.5" />
				<span class="line-clamp-1 text-ellipsis">{{ product.trademark }}</span>
			</div>
		</div>
	</article>
</template>
