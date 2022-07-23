<template>
	<div class="flex items-center space-x-4 w-full mt-3 h-10">
		<IconMdiFilterOutline
			v-if="Object.keys(store).length || Object.keys(category).length"
			class="h-6 w-6 dark:text-slate-400 text-gray-600"
		/>

		<AppChip
			:title="store.name"
			@clear="piniaStore.setStore({} as Store)"
			v-if="Object.keys(store).length"
		/>

		<AppChip
			:title="category.name"
			@clear="piniaStore.setCategory({} as Category)"
			v-if="Object.keys(category).length"
		/>
	</div>
</template>

<script setup lang="ts">
import type { Category } from '~/models/category'
import type { Store } from '~/models/store'
import { useStore } from '~/stores/main'

const piniaStore = useStore()

const category = computed(() => piniaStore.category)
const store = computed(() => piniaStore.store)
</script>
