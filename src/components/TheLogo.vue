<script setup lang="ts">
import { useStore } from '~/stores/main'
import type { Category } from '~/models/category'
import type { Store } from '~/models/store'

const store = useStore()

function reset() {
	store.setCategory({} as Category)
	store.setStore({} as Store)
}
</script>

<template>
	<NuxtLink
		@click="reset()"
		class="flex items-center"
		to="/"
	>
		<img
			width="64"
			height="64"
			src="~/assets/logo.svg"
			alt="priceefy logo"
		/>
		<span class="text-xl dark:text-slate-100 text-gray-800 font-medium hidden lg:block lg:w-full">
			Priceefy
		</span>
	</NuxtLink>
</template>
