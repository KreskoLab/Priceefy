<template>
	<div class="flex items-center space-x-4 w-full mt-3 h-10">
		<svg
			class="h-6 w-6 text-slate-400"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			stroke-width="2"
			v-if="Object.keys(store).length || Object.keys(category).length"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
			/>
		</svg>

		<Chip
			:title="store.name"
			@clear="piniaStore.setStore({} as Store)"
			v-if="Object.keys(store).length"
		/>

		<Chip
			:title="category.name"
			@clear="piniaStore.setCategory({} as Category)"
			v-if="Object.keys(category).length"
		/>
	</div>
</template>

<script
	setup
	lang="ts"
>
import type { Category } from '~/models/category'
import type { Store } from '~/models/store'
import { useStore } from '~/stores/main'

const piniaStore = useStore()

const category = computed(() => piniaStore.category)
const store = computed(() => piniaStore.store)
</script>
