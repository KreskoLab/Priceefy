<template>
	<aside
		class="block h-full overflow-y-auto lg:fixed lg:h-[calc(100%-5rem)] lg:top-20 lg:ml-6 lg:pb-10 lg:invisible scrollbox"
	>
		<div class="w-full px-3 lg:w-72 scrollbox-content">
			<AppSidebarBlock
				v-model="store"
				title="Магазини"
				:items="piniaStore.availableStores"
			/>

			<AppSidebarBlock
				v-model="category"
				title="Категорії"
				:items="categories"
			/>
		</div>
	</aside>
</template>

<script
	setup
	lang="ts"
>
import type { Category } from '~/models/category'
import type { Store } from '~/models/store'
import { useStore } from '~/stores/main'

const piniaStore = useStore()
const queryObject = useQueryObject()

const category = computed({
	get: () => piniaStore.category,
	set: (value: Category) => piniaStore.setCategory(value),
})

const store = computed({
	get: () => piniaStore.store,
	set: (value: Store) => piniaStore.setStore(value),
})

const [{ data: stores }, { data: categories }] = await Promise.all([
	useFetch<Store[]>('/api/stores'),
	useFetch<Category[]>('/api/categories'),
])

piniaStore.setStores(stores.value)

store.value = findItemBySlug(piniaStore.availableStores, queryObject.store) || store.value
category.value = findItemBySlug(categories.value, queryObject.category) || category.value

function findItemBySlug(arr: (Store | Category)[], slug: string): Store | Category {
	const item = arr.find(item => item.slug === slug)

	if (item) return JSON.parse(JSON.stringify(item))
	else return undefined
}
</script>

<style scoped>
::-webkit-scrollbar {
	width: 5px;
	background: transparent;
}

/* Track */
::-webkit-scrollbar-track {
	background: #0f172a;
}

/* Handle */
::-webkit-scrollbar-thumb {
	background: #94a3b8;
	border-radius: 5px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
	background: #94a3b8;
}

.scrollbox {
	transition: visibility 0.1s;
}

.scrollbox-content,
.scrollbox:hover,
.scrollbox:focus {
	visibility: visible;
}
</style>
