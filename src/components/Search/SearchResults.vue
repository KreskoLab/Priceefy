<script setup lang="ts">
import type { Product } from '~/models/product'

type Result = Pick<Product, 'name' | 'slug' | 'image'> & { weight: string; price: string }

const props = defineProps<{
	results: Product[]
	loading: boolean
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
	<div class="absolute bg-white dark:bg-slate-800 rounded-lg w-full py-3 mt-5 z-50">
		<div v-if="!loading">
			<ul
				v-if="results.length"
				class="max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent scrollbar-thumb-rounded-md"
			>
				<li
					v-for="item in products"
					:key="item.slug"
					class="dark:text-slate-300 text-gray-800 transtion duration-150 hover:bg-gray-200/70 dark:hover:bg-slate-700/70 px-4 py-3"
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

						<p class="text-sm">{{ item.price }}</p>
					</NuxtLink>
				</li>
			</ul>

			<p
				class="text-center py-12"
				v-else
			>
				Нічого не знайдено :(
			</p>
		</div>

		<div
			class="flex items-center justify-center h-32"
			v-else
		>
			<div role="status">
				<svg
					class="inline mr-2 w-12 h-12 lg:w-14 lg:h-14 text-gray-200 animate-spin dark:text-gray-600 fill-teal-400"
					viewBox="0 0 100 101"
					fill="none"
				>
					<path
						d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
						fill="currentColor"
					/>
					<path
						d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
						fill="currentFill"
					/>
				</svg>
			</div>
		</div>
	</div>
</template>
