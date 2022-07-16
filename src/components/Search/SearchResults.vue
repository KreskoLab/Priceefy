<script setup lang="ts">
import type { Product } from '~/models/product'

type Result = Pick<Product, 'name' | 'slug' | 'image'> & { weight: string; price: string }

const props = defineProps<{
	results: Product[]
}>()

const products = computed<Result[]>(() =>
	props.results.map(item => {
		return {
			name: item.name,
			slug: item.slug,
			image: item.image,
			weight: useHandleWeight(item.weight, item.unit),
			price: useHandlePrice(item.prices),
		}
	})
)
</script>

<template>
	<div class="absolute bg-white dark:bg-slate-700 rounded-lg w-full py-3 mt-5 z-50">
		<ul
			class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-300 scrollbar-track-white dark:scrollbar-track-slate-700 scrollbar-thumb-rounded-md"
		>
			<li
				v-for="item in products"
				:key="item.slug"
				class="dark:text-slate-300 text-gray-800 transtion duration-150 hover:bg-gray-200/70 dark:hover:bg-slate-600/70 px-4 py-3"
			>
				<NuxtLink
					class="flex items-center justify-between"
					:to="`/product/${item.slug}`"
				>
					<div class="flex items-center space-x-4 overflow-x-hidden w-8/12">
						<nuxt-img
							class="p-1"
							format="webp"
							width="48"
							height="48"
							:src="item.image"
							:alt="item.name"
						/>

						<p class="text-sm truncate">{{ item.name }} {{ item.weight }}</p>
					</div>

					<p>{{ item.price }}</p>
				</NuxtLink>
			</li>
		</ul>
	</div>
</template>
